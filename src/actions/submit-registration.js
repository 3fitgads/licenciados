'use server';

import { headers } from 'next/headers';

import { api } from '@/services/api.service';
import { rateLimitByEmail, rateLimitByIp } from '@/lib/rate-limit';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REGISTRATIONS_ENDPOINT =
  process.env.REGISTRATIONS_ENDPOINT || '/api/registrations';

function validateRegistrationData(formData) {
  const { name, email, phone, investment, startTimeline } = formData || {};

  if (!name || name.trim().length < 3) {
    return { valid: false, error: 'Nome inválido' };
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'E-mail inválido' };
  }

  if (!phone || phone.trim().length < 6) {
    return { valid: false, error: 'WhatsApp inválido' };
  }

  if (!investment) {
    return { valid: false, error: 'Selecione um investimento' };
  }

  if (!startTimeline) {
    return { valid: false, error: 'Selecione quando pretende iniciar' };
  }

  return { valid: true };
}

export async function submitRegistration(formData) {
  const validation = validateRegistrationData(formData);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const emailForLimit = (formData?.email ?? '').trim().toLowerCase();
  const headersList = headers();
  const forwardedFor = headersList.get('x-forwarded-for') ?? '';
  const xRealIp = headersList.get('x-real-ip') ?? '';
  const ip = (forwardedFor.split(',')[0]?.trim() || xRealIp || 'unknown');

  try {
    if (rateLimitByIp) {
      const ipLimit = await rateLimitByIp.limit(`registration:ip:${ip}`);
      if (!ipLimit.success) {
        console.warn('rate_limit_blocked:ip');
        return {
          success: false,
          error: 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.',
        };
      }
    }

    if (rateLimitByEmail && emailForLimit) {
      const emailLimit = await rateLimitByEmail.limit(
        `registration:email:${emailForLimit}`
      );
      if (!emailLimit.success) {
        console.warn('rate_limit_blocked:email');
        return {
          success: false,
          error: 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.',
        };
      }
    }
  } catch (error) {
    console.error('rate_limit_error', error);
  }

  if (!REGISTRATIONS_ENDPOINT) {
    console.error('REGISTRATIONS_ENDPOINT não configurado');
    return {
      success: false,
      error: 'Configuração do servidor incompleta. Entre em contato com o suporte.',
    };
  }

  const { name, email, state, city, phone, countryCode, investment, startTimeline } = formData;

  // Limpa o telefone removendo caracteres não numéricos
  const cleanPhone = phone ? phone.replace(/[\s()\-+]/g, '') : '';

  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    state,
    city,
    phone: cleanPhone,
    countryCode: countryCode || '55', // Inclui o código do país
    investment,
    startTimeline,
  };

  const result = await api.post(REGISTRATIONS_ENDPOINT, payload);

  if (!result.success) {
    return {
      success: false,
      error: result.error || 'Não foi possível enviar seus dados. Tente novamente.',
    };
  }

  return { success: true };
}
