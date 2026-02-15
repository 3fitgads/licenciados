'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Banner } from "@/components/ui/banner";
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Script from 'next/script';
import { submitRegistration } from '@/actions/submit-registration';
import { track } from '@/lib/meta-pixel';
import { STATE_CITY_MAP } from '@/lib/state-city.map';
import { Combobox } from '@/components/ui/combobox';

const TOTAL_STEPS = 6;

const stepVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const stepTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const successVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
};

const checkCircleVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: [0, 1.2, 1],
    opacity: [0, 1, 1],
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

const checkIconVariants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const textVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export function RegistrationFormSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldAutoFocus, setShouldAutoFocus] = useState(false);

  const formatPhone = (digits) => {
    const d = (digits ?? '').replace(/\D/g, '').slice(0, 11);
    const ddd = d.slice(0, 2);
    const part1 = d.length > 10 ? d.slice(2, 7) : d.slice(2, 6);
    const part2 = d.length > 10 ? d.slice(7, 11) : d.slice(6, 10);

    if (!d) return '';
    if (d.length <= 2) return `(${ddd}`;
    if (d.length <= 6) return `(${ddd}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${ddd}) ${part1}${part2 ? `-${part2}` : ''}`;
    return `(${ddd}) ${part1}${part2 ? `-${part2}` : ''}`;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasHash = window.location.hash === '#formulario';
      setShouldAutoFocus(hasHash);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    state: '',
    city: '',
    phone: '',
    investment: '',
    startTimeline: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 11);
      const masked = formatPhone(digits);
      setFormData({
        ...formData,
        phone: masked,
      });
      if (errors.phone) {
        setErrors({
          ...errors,
          phone: '',
        });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Nome completo é obrigatório';
        } else if (formData.name.trim().length < 3) {
          newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
        }
        break;
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = 'E-mail é obrigatório';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'E-mail inválido';
        }
        break;
      case 3:
        const phoneDigits = formData.phone.replace(/\D/g, '');
        if (!phoneDigits) {
          newErrors.phone = 'WhatsApp é obrigatório';
        } else if (phoneDigits.length !== 11) {
          newErrors.phone = 'Informe um WhatsApp com 11 números (DDD + número)';
        }
        break;
      case 4:
        if (!formData.state) {
          newErrors.state = 'Selecione um estado';
        }
        if (!formData.city) {
          newErrors.city = 'Selecione uma cidade';
        }
        break;
      case 5:
        if (!formData.investment) {
          newErrors.investment = 'Selecione uma opção de investimento';
        }
        break;
      case 6:
        if (!formData.startTimeline) {
          newErrors.startTimeline = 'Selecione quando pretende iniciar';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e?.preventDefault?.();
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setDirection(1);
        setErrors({});
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const isValid = validateStep(currentStep);
    if (!isValid) return;

    try {
      setIsSubmitting(true);
      const result = await submitRegistration(formData);

      if (result?.success) {
        track('Lead');
        setIsSubmitted(true);
      } else {
        setSubmitError(result?.error || 'Não foi possível enviar seus dados. Tente novamente.');
      }
    } catch (error) {
      console.error('handleSubmit error:', error);
      setSubmitError('Erro inesperado ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  const progressDots = useMemo(() => {
    return Array.from({ length: TOTAL_STEPS }).map((_, index) => {
      const step = index + 1;
      const isCompleted = step < currentStep;
      const isActive = step === currentStep;

      return (
        <div
          key={step}
          className={cn(
            "w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center",
            isCompleted && "bg-primary",
            isActive && "bg-primary scale-110 ring-2 ring-primary ring-offset-2",
            !isCompleted && !isActive && "bg-gray-300"
          )}
        >
          {isCompleted ? (
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          ) : (
            <span className={cn(
              "text-xs font-semibold",
              isActive ? "text-white" : "text-gray-500"
            )}>
              {step}
            </span>
          )}
        </div>
      );
    });
  }, [currentStep]);

  const SuccessScreen = ({ formData }) => {
    const calendarRef = useRef(null);
    const calendlyContainerRef = useRef(null);
    const calendlyInitializedRef = useRef(false);
    const [showCalendly, setShowCalendly] = useState(false);
    const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowCalendly(true);
      }, 4000);

      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (!showCalendly) return;
      if (!isCalendlyLoaded) return;
      if (!calendlyContainerRef.current) return;
      if (calendlyInitializedRef.current) return;

      const phoneDigits = (formData?.phone ?? '').replace(/\D/g, '');
      const brPhoneE164 = `+55${phoneDigits}`;

      // https://calendly.com/d/cxp2-7t8-pgj/nova-reuniao?primary_color=ff8d00
      calendlyContainerRef.current.innerHTML = '';
      window.Calendly?.initInlineWidget?.({
        url: 'https://calendly.com/d/cxp2-7t8-pgj/nova-reuniao?primary_color=ff8d00',
        parentElement: calendlyContainerRef.current,
        prefill: {
          name: formData?.name ?? '',
          email: formData?.email ?? '',
          smsReminderNumber: brPhoneE164,
          customAnswers: {
            a1: brPhoneE164,
          },
        },
      });

      calendlyInitializedRef.current = true;
    }, [showCalendly, isCalendlyLoaded, formData]);

    useEffect(() => {
      if (showCalendly && calendarRef.current) {
        setTimeout(() => {
          const elementPosition = calendarRef.current.getBoundingClientRect().top + window.pageYOffset;
          const offset = 80;

          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }, 300);
      }
    }, [showCalendly]);

    return (
      <>
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="afterInteractive"
          onLoad={() => setIsCalendlyLoaded(true)}
        />

        <motion.div
          variants={successVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full flex flex-col items-center"
        >
          <div className="relative mb-6 px-6 md:px-8 pt-8">
            <motion.div
              variants={checkCircleVariants}
              initial="initial"
              animate="animate"
              className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center mx-auto"
            >
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-12 md:h-12"
                style={{ overflow: 'visible' }}
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  variants={checkIconVariants}
                  initial="initial"
                  animate="animate"
                  strokeDasharray="1"
                  strokeDashoffset="0"
                />
              </motion.svg>
            </motion.div>
          </div>

          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            className="space-y-3 text-center mb-6 px-6 md:px-8 bg-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-dark">
              Cadastro Realizado com Sucesso!
            </h2>
            <p className="text-base md:text-lg text-gray-medium max-w-md mx-auto">
              Estamos quase lá! Agende agora sua reunião de 30 minutos com um de nossos especialistas para entender todo o modelo de negócio da 3Fit
            </p>
          </motion.div>

          {showCalendly && (
            <motion.div
              ref={calendarRef}
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden"
              style={{
                minWidth: 320,
                height: 700,
                backgroundColor: '#FFFFFF',
              }}
            >
              <div
                ref={calendlyContainerRef}
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>
          )}
        </motion.div>
      </>
    );
  };

  const renderStep = () => {
    const states = Object.keys(STATE_CITY_MAP).sort((a, b) => a.localeCompare(b));
    const citiesForState = formData.state ? (STATE_CITY_MAP[formData.state] ?? []) : [];

    switch (currentStep) {
      case 1:
        return (
          <div className="w-full">
            <label htmlFor="name" className="block text-gray-dark font-semibold mb-1.5 text-sm">
              Nome Completo *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={handleChange}
              className={cn(errors.name && 'border-red-500 focus:ring-red-500')}
              autoFocus={shouldAutoFocus && currentStep === 1}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="w-full">
            <label htmlFor="email" className="block text-gray-dark font-semibold mb-1.5 text-sm">
              E-mail *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu melhor Email"
              value={formData.email}
              onChange={handleChange}
              className={cn(errors.email && 'border-red-500 focus:ring-red-500')}
              autoFocus={shouldAutoFocus && currentStep === 2}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        );
      case 3:
        return (
          <div className="w-full">
            <label htmlFor="phone" className="block text-gray-dark font-semibold mb-1.5 text-sm">
              WhatsApp *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Digite seu WhatsApp"
              value={formData.phone}
              onChange={handleChange}
              className={cn(errors.phone && 'border-red-500 focus:ring-red-500')}
              inputMode="numeric"
              autoComplete="tel"
              autoFocus={shouldAutoFocus && currentStep === 3}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        );
      case 4:
        return (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-3">
              <div>
                <label htmlFor="state" className="block text-gray-dark font-semibold mb-1.5 text-sm">
                  Estado (UF) *
                </label>
                <Combobox
                  value={formData.state}
                  onChange={(nextState) => {
                    setFormData((prev) => ({ ...prev, state: nextState, city: '' }));
                    if (errors.state || errors.city) {
                      setErrors((prev) => ({ ...prev, state: '', city: '' }));
                    }
                  }}
                  options={states.map((uf) => ({ value: uf, label: uf }))}
                  placeholder="Selecione"
                  inputClassName={cn(errors.state && 'border-red-500 focus:ring-red-500')}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-gray-dark font-semibold mb-1.5 text-sm">
                  Cidade *
                </label>
                <Combobox
                  value={formData.city}
                  onChange={(nextCity) => {
                    setFormData((prev) => ({ ...prev, city: nextCity }));
                    if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                  }}
                  options={citiesForState.map((city) => ({ value: city, label: city }))}
                  placeholder={formData.state ? "Selecione" : "Selecione um estado"}
                  disabled={!formData.state}
                  inputClassName={cn(errors.city && 'border-red-500 focus:ring-red-500')}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                )}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="w-full">
            <label htmlFor="investment" className="block text-gray-dark font-semibold mb-1.5 text-sm">
              Investimentos: *
            </label>
            <Select
              id="investment"
              name="investment"
              value={formData.investment}
              onChange={handleChange}
              className={cn(errors.investment && 'border-red-500 focus:ring-red-500')}
            >
              <option value="">Selecione uma opção</option>
              <option value="14997-20000">14.997 a 20.000</option>
              <option value="20000-25000">20.000 a 25.000</option>
              <option value="30000+">+ 30.000</option>
            </Select>
            {errors.investment && (
              <p className="mt-1 text-sm text-red-500">{errors.investment}</p>
            )}
          </div>
        );
      case 6:
        return (
          <div className="w-full">
            <label htmlFor="startTimeline" className="block text-gray-dark font-semibold mb-1.5 text-sm">
              Quando você pretende iniciar o negócio? *
            </label>
            <Select
              id="startTimeline"
              name="startTimeline"
              value={formData.startTimeline}
              onChange={handleChange}
              className={cn(errors.startTimeline && 'border-red-500 focus:ring-red-500')}
              autoFocus={shouldAutoFocus && currentStep === 6}
            >
              <option value="">Selecione uma opção</option>
              <option value="Imediatamente">Imediatamente</option>
              <option value="Em 30 dias">Em 30 dias</option>
              <option value="Em 60 dias">Em 60 dias</option>
              <option value="Mais de 90 dias">Mais de 90 dias</option>
            </Select>
            {errors.startTimeline && (
              <p className="mt-1 text-sm text-red-500">{errors.startTimeline}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="formulario" className="relative py-12 pb-14 sm:pb-20 md:pb-24 lg:pb-32 scroll-mt-20 overflow-visible">
      <div
        className="absolute w-full h-full -top-10 md:top-0 left-0 right-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="relative w-full h-full">
          <Banner text="INSCREVA-SE" />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-2 md:mt-20 lg:mt-32 relative z-20">
        <div className="max-w-2xl mx-auto">
          <AnimateOnScroll animation="fadeInDown" delay={0.1} duration={0.8}>
            <div className="bg-[#0D0D0D] rounded-t-2xl p-6 md:p-8 text-center text-white mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#FF8D00] mb-3">
                Garanta Sua Vaga Agora!
              </h2>
              <p className="text-base md:text-lg text-white/90">
                Preencha o formulário e receba todas as informações sobre o programa
              </p>
            </div>
          </AnimateOnScroll>

          <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden" style={{ transform: 'none' }}>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <SuccessScreen key="success" formData={formData} />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="px-6 md:px-8 pt-6 md:pt-8"
                    style={{
                      isolation: 'isolate',
                      contain: 'layout style paint',
                      transform: 'translateZ(0)',
                      position: 'relative',
                      zIndex: 10
                    }}
                  >
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-dark">
                          Passo {currentStep} de {TOTAL_STEPS}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          layout={false}
                          style={{ willChange: 'width' }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center gap-2 mb-6">
                      {progressDots}
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    onKeyDown={(e) => {
                      if (e.key !== 'Enter') return;
                      if (currentStep < TOTAL_STEPS) e.preventDefault();
                    }}
                  >
                    <div className="px-6 md:px-8 pb-4 min-h-[120px] flex items-center" style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
                      <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <motion.div
                          key={currentStep}
                          custom={direction}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={stepTransition}
                          className="w-full"
                          layout={false}
                          style={{
                            willChange: 'transform, opacity',
                            position: 'relative',
                            zIndex: 1
                          }}
                        >
                          {renderStep()}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="px-6 md:px-8 pb-4 space-y-4">
                      <div className="flex gap-3 justify-between">
                        {currentStep > 1 ? (
                          <Button
                            type="button"
                            onClick={handleBack}
                            variant="white"
                            disabled={isSubmitting}
                            className="flex-1 md:flex-initial text-[#FF7033] flex items-center justify-center gap-2 hover:!bg-gray-100 normal-case"                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>VOLTAR</span>
                          </Button>
                        ) : (
                          <div></div>
                        )}

                        {currentStep < TOTAL_STEPS ? (
                          <Button
                            key="next"
                            type="button"
                            onClick={handleNext}
                            variant="primary"
                            disabled={isSubmitting}
                            className="flex-1 md:flex-initial flex items-center justify-center gap-2"
                          >
                            <span>Próximo</span>
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            key="submit"
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            className="flex-1 md:flex-initial w-full md:w-auto"
                          >
                            {isSubmitting ? 'Enviando...' : 'QUERO COMEÇAR AGORA'}
                          </Button>
                        )}
                      </div>

                      {submitError && (
                        <p className="text-center text-sm text-red-500">
                          {submitError}
                        </p>
                      )}

                      {currentStep === TOTAL_STEPS && (
                        <p className="text-center text-sm text-gray-400 mt-4">
                          Seus dados estão seguros e não serão compartilhados com terceiros
                        </p>
                      )}
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 translate-y-1 left-0 right-0 z-20 md:hidden">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="absolute hidden md:block bottom-0 translate-y-1 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto relative z-10">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}
