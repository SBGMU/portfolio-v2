"use client"

import { useState, useEffect } from "react"
import { CreditCard, Database, Monitor, Car, MapPin, Calendar, Clock, X, Building2 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const experiences = [
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Data Coordinator & ATM Migration Project",
    company: "2SF Cash Services",
    city: "La Plaine Saint-Denis",
    date: "Sep 2024 - Present",
    duration: "1,5 years",
    preview:
      "Designed interactive and dynamic dashboards to monitor over 1300 ATM migrations to Cash Services in real time.",
    description: (
      <>
        <p>
          Designed interactive and <strong className="text-foreground">dynamic dashboards to monitor over 1300 ATM migrations </strong>to Cash Services in real time, <strong className="text-foreground">providing strategic and accurate visibility on key operational data. </strong>
          Coordinated pre-migration interventions including infrastructure setup with property owners, Bouygues Telecom, Orange Business, BRINKS, and Loomis.
        </p>
        <p>
          Build and automate complex processes using<strong className="text-foreground"> VBA to optimize the management of project</strong> and ATM databases.
        </p>
        <p>
          <strong className="text-foreground">Developed and led advanced statistical analyses </strong>(migration time by technician, incident tracking, and regional performance trends).
          <strong className="text-foreground">Enhanced data reliability through advanced cross-referencing in Excel, ensuring high-quality traceability and alignment</strong> across partner decision-making teams.
        </p>
      </>
    ),
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Database Manager",
    company: "Vinci Construction GeoInfrastructure",
    city: "Nanterre",
    date: "Aug 2024 - Sep 2024",
    duration: "2 months",
    preview:
      "Maintained and optimised the HR onboarding integration database for VCGI using VBA and Index-Match formulas.",
    description: (
      <>
        <p>
          Maintained and <strong className="text-foreground">optimised the HR onboarding integration database for VCGI using VBA and Index-Match formulas to collect and input employee data.</strong>
        </p>
        <p>
          Updated and validated records to ensure <strong className="text-foreground">data accuracy and compliance within the VCGI system.</strong>
        </p>
        <p>
          Secured sensitive information in line with GDPR standards.
        </p>
      </>
    ),
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "PHP Developer",
    company: "Luteciel",
    city: "Paris 1er",
    date: "Jan 2018 - Jan 2020",
    duration: "2 years",
    preview:
      "Rebuilt online ticket booking platform using PHP. Created Excel VBA macros and queried SQL databases for reporting.",
    description: (
      <>
        <p>
          Rebuilt online ticket booking platform using PHP.
        </p>
        <p>
          <strong className="text-foreground">Created Excel VBA macros. Queried SQL databases </strong> for commercial reporting.
        </p>
        <p>
          <strong className="text-foreground">Managed digital communication and automated client data integration. </strong>
        </p>
        <i>Web forms and UI improvements led to a 40% increase in user interaction.</i>
      </>
    ),
  },
  {
    icon: <Car className="h-6 w-6" />,
    title: "Web Developer",
    company: "Auto-Ecole de la Gare",
    city: "Saint-Gratien",
    date: "Nov 2016 - Dec 2016",
    duration: "2 months",
    preview:
      "Designed a showcase website using PHP and MySQL. Integrated Google Maps API for locating 3 branches.",
    description: (
      <>
        <p>
          Designed a <strong className="text-foreground">showcase website using PHP and MySQL. Integrated Google Maps API </strong> for locating 3 branches.
        </p>
        <p>
          Created an online contact and information request form :
        </p>
        <i> Increased potential student inquiries via email by 40% over the year 2017.</i>
      </>
    ),
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useScrollReveal(0.1)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (expandedIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [expandedIndex])

  return (
    <>
      <section id="experiences" className="py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div
            ref={ref}
            className={`${isVisible ? "reveal-up" : "opacity-0"}`}
          >
            <h2 className="font-heading text-5xl font-bold text-muted-foreground mb-12">
              Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.title}
                experience={exp}
                index={index}
                onExpand={() => setExpandedIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Expanded card modal with scroll */}
      {expandedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setExpandedIndex(null)}
        >
          <div
            className="bg-card rounded-2xl border border-border p-8 max-w-lg w-full relative max-h-[85vh] overflow-y-auto shadow-[0_16px_50px_rgba(0,0,0,0.5),0_4px_16px_rgba(5,107,255,0.15)]"
            style={{ animation: "reveal-scale 0.25s cubic-bezier(0.22,1,0.36,1) forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setExpandedIndex(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#033580] to-[#056BFF] flex items-center justify-center text-primary-foreground mb-5 shadow-[0_4px_14px_rgba(5,107,255,0.3)]">
              {experiences[expandedIndex].icon}
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              {experiences[expandedIndex].title}
            </h3>

            <div className="flex flex-col gap-1.5 mb-5">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs font-medium text-foreground">{experiences[expandedIndex].company}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">{experiences[expandedIndex].city}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">{experiences[expandedIndex].date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs">{experiences[expandedIndex].duration}</span>
              </div>
            </div>

            <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
              {experiences[expandedIndex].description}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ExperienceCard({
  experience,
  index,
  onExpand,
}: {
  experience: (typeof experiences)[0]
  index: number
  onExpand: () => void
}) {
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <div
      ref={ref}
      onClick={onExpand}
      className={`bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all duration-300 group cursor-pointer flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(5,107,255,0.15),0_4px_12px_rgba(0,0,0,0.3)] ${isVisible ? "reveal-scale" : "opacity-0"
        }`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-primary mb-4 group-hover:bg-gradient-to-r group-hover:from-[#033580] group-hover:to-[#056BFF] group-hover:text-primary-foreground transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
        {experience.icon}
      </div>
      <h3 className="font-heading text-base font-semibold text-foreground mb-1">
        {experience.title}
      </h3>

      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Building2 className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs font-medium text-foreground">{experience.company}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">{experience.city}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">{experience.date}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs">{experience.duration}</span>
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
        {experience.preview}
      </p>

      <span className="text-primary text-xs font-medium group-hover:underline mt-3 block">
        See more
      </span>
    </div>
  )
}
