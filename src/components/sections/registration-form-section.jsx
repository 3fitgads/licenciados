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

const TOTAL_STEPS = 4;

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

  useEffect(() => {
    // Só permite autofocus se houver hash na URL (usuário clicou em link)
    if (typeof window !== 'undefined') {
      const hasHash = window.location.hash === '#formulario';
      setShouldAutoFocus(hasHash);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investment: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
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
        if (!formData.phone.trim()) {
          newErrors.phone = 'WhatsApp é obrigatório';
        } else if (!/^[\d\s()+-]+$/.test(formData.phone.replace(/\s/g, ''))) {
          newErrors.phone = 'Formato de telefone inválido';
        }
        break;
      case 4:
        if (!formData.investment) {
          newErrors.investment = 'Selecione uma opção de investimento';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setDirection(1);
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
    if (validateStep(currentStep)) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // TODO: Implement server action or API call
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsSubmitted(true);
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

    // Construir URL do Calendly com pre-fill
    const buildCalendlyUrl = () => {
      const baseUrl = 'https://calendly.com/jhonathan_galhardo/30min?hide_gdpr_banner=1';
      const params = new URLSearchParams();

      // Adiciona parâmetros de pre-fill
      if (formData.name) {
        params.append('name', formData.name);
      }
      if (formData.email) {
        params.append('email', formData.email);
      }
      if (formData.phone) {
        // Remove espaços e caracteres especiais do telefone
        const cleanPhone = formData.phone.replace(/\s/g, '');
        params.append('a1', cleanPhone);
      }

      const queryString = params.toString();
      return queryString ? `${baseUrl}&${queryString}` : baseUrl;
    };

    const calendlyUrl = buildCalendlyUrl();

    // Scroll para o calendário quando o componente for montado
    useEffect(() => {
      setTimeout(() => {
        if (calendarRef.current) {
          const elementPosition = calendarRef.current.getBoundingClientRect().top + window.pageYOffset;
          const offset = 80; // Ajuste esse valor (positivo = sobe, negativo = desce)

          window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
          });
        }
      }, 3000);
    }, []);

    return (
      <motion.div
        variants={successVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex flex-col items-center"
      >
        {/* Animated Check Circle */}
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

        {/* Success Message */}
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
            Inscrição realizada! Agora, agende sua reunião abaixo:
          </p>
        </motion.div>

        {/* Calendly Iframe */}
        <motion.div
          ref={calendarRef}
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="w-full bg-white rounded-2xl shadow-xl overflow-hidden"
          style={{
            height: '100vh',
            maxHeight: '100vh',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#FFFFFF',        
          }}
        >
          <iframe
            src={calendlyUrl}
            style={{
              border: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              display: 'block',             
              backgroundColor: '#FFFFFF',
            }}
            title="Agendar Reunião"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    );
  };

  const renderStep = () => {
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
      default:
        return null;
    }
  };

  return (
    <section id="formulario" className="relative py-12 pb-14 sm:pb-20 md:pb-24 lg:pb-32 scroll-mt-20 overflow-visible">
      {/* bg.png removido - usando componente Bg global */}
      <div
        className="absolute w-full h-full -top-10 md:top-0 left-0 right-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="relative w-full h-full">
          <Banner text="INSCREVA-SE" />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-2 md:mt-20 lg:mt-32 relative z-20">
        <div className="max-w-2xl mx-auto">
          {/* Banner */}
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

          {/* Form Card */}
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
                  {/* Progress Indicator - Completely isolated from animations */}
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
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-dark">
                          Passo {currentStep} de {TOTAL_STEPS}
                        </span>
                        <span className="text-sm text-gray-medium">
                          {Math.round(progressPercentage)}%
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

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 mb-6">
                      {progressDots}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Step Content */}
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

                    {/* Navigation Buttons */}
                    <div className="px-6 md:px-8 pb-4 space-y-4">
                      <div className="flex gap-3 justify-between">
                        {currentStep > 1 ? (
                          <Button
                            type="button"
                            onClick={handleBack}
                            variant="white"
                            className="flex-1 md:flex-initial text-[#FF7033] flex items-center justify-center gap-2 hover:!bg-gray-100 normal-case"                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>VOLTAR</span>
                          </Button>
                        ) : (
                          <div></div>
                        )}

                        {currentStep < TOTAL_STEPS ? (
                          <Button
                            type="button"
                            onClick={handleNext}
                            variant="primary"
                            className="flex-1 md:flex-initial flex items-center justify-center gap-2"
                          >
                            <span>Próximo</span>
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            variant="primary"
                            className="flex-1 md:flex-initial w-full md:w-auto"
                          >
                            QUERO COMEÇAR AGORA
                          </Button>
                        )}
                      </div>

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

      {/* Wave at bottom - Mobile only */}
      <div className="absolute bottom-0 translate-y-1 left-0 right-0 z-20 md:hidden">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Wave at bottom - Desktop only */}
      <div className="absolute hidden md:block bottom-0 translate-y-1 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto relative z-10">
          <path d="M0 120L60 100C120 80 240 40 360 33.3C480 26.7 600 53.3 720 66.7C840 80 960 80 1080 66.7C1200 53.3 1320 26.7 1380 13.3L1440 0V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}
