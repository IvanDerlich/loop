"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ShoppingCart, Zap } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function OnboardingFlow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const slides = [
    {
      icon: ShoppingCart,
      title: "Compra y vende B2B sin fricciones",
      description:
        "Conecta con empresas verificadas y simplifica tu proceso de compras con nuestro marketplace empresarial.",
      color: "text-primary",
    },
    {
      icon: Zap,
      title: "Compras automatizadas",
      description: "Configura reglas de compra automáticas y deja que Abasti gestione tus pedidos recurrentes.",
      color: "text-primary",
    },
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handleSkip = () => {
    window.location.href = "/create-profile"
  }

  const CurrentIcon = slides[currentSlide].icon
  const isLastSlide = currentSlide === slides.length - 1

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Omitir
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
              <CurrentIcon className={`w-12 h-12 ${slides[currentSlide].color}`} />
            </div>
          </div>

          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-balance">{slides[currentSlide].title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Términos y condiciones en paso 2 */}
          {isLastSlide && (
            <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
              <h3 className="font-semibold text-sm">Términos y condiciones</h3>
              <ScrollArea className="h-32 rounded-md border bg-background p-3 text-xs text-muted-foreground">
                <p className="mb-2">
                  Al utilizar Abasti aceptas cumplir con estos términos. La plataforma conecta compradores y
                  vendedores B2B; tú eres responsable de la veracidad de la información que publicas y de las
                  transacciones que realices.
                </p>
                <p className="mb-2">
                  Abasti no actúa como intermediario en las transacciones ni garantiza el cumplimiento entre
                  partes. El uso de datos personales y de empresa se rige por nuestra política de privacidad.
                </p>
                <p>
                  Nos reservamos el derecho de modificar estos términos. El uso continuado de la plataforma
                  tras los cambios implica su aceptación.
                </p>
              </ScrollArea>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Acepto los términos y condiciones
                </label>
              </div>
            </div>
          )}

          <div className="flex justify-center gap-2 pt-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
                aria-label={`Ir al paso ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3 flex flex-col items-center">
        {isLastSlide ? (
          <>
            <Button
              size="lg"
              className="w-[280px] h-[40px] text-base font-medium"
              onClick={() => (window.location.href = "/create-profile")}
              disabled={!acceptedTerms}
            >
              Crear perfil de empresa
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-[280px] h-[40px] text-base font-medium bg-transparent"
              onClick={() => (window.location.href = "/signin")}
            >
              Iniciar sesión
            </Button>
          </>
        ) : (
          <Button size="lg" className="w-[280px] h-[40px] text-base font-medium" onClick={handleNext}>
            Siguiente
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
}
