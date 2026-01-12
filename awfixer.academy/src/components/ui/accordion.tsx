import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface AccordionProps {
  children: React.ReactNode
  className?: string
  type?: "single" | "multiple"
  collapsible?: boolean
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

const AccordionContext = React.createContext<{
  type: "single" | "multiple"
  collapsible: boolean
  openItems: Set<string>
  toggleItem: (value: string) => void
}>({
  type: "single",
  collapsible: false,
  openItems: new Set(),
  toggleItem: () => {}
})

const AccordionItemValueContext = React.createContext<string>("")

const Accordion: React.FC<AccordionProps> = ({ 
  children, 
  className, 
  type = "single", 
  collapsible = false 
}) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set())

  const toggleItem = React.useCallback((value: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      
      if (type === "single") {
        if (newSet.has(value)) {
          if (!collapsible) return prev
          newSet.delete(value)
        } else {
          newSet.clear()
          newSet.add(value)
        }
      } else {
        if (newSet.has(value)) {
          newSet.delete(value)
        } else {
          newSet.add(value)
        }
      }
      
      return newSet
    })
  }, [type, collapsible])

  return (
    <AccordionContext.Provider value={{ type, collapsible, openItems, toggleItem }}>
      <div className={cn("space-y-1", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItem: React.FC<AccordionItemProps> = ({ value, children, className }) => {
  return (
    <div className={cn("border-b", className)}>
      <AccordionItemValueContext.Provider value={value}>
        {children}
      </AccordionItemValueContext.Provider>
    </div>
  )
}

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, className }) => {
  const context = React.useContext(AccordionContext)
  const itemValue = React.useContext(AccordionItemValueContext)
  const isOpen = context.openItems.has(itemValue)

  const buttonClass = cn(
    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
    isOpen && "rotate-icon",
    className
  )

  return (
    <button
      className={buttonClass}
      onClick={() => context.toggleItem(itemValue)}
    >
      {children}
      <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
    </button>
  )
}

const AccordionContent: React.FC<AccordionContentProps> = ({ children, className }) => {
  const context = React.useContext(AccordionContext)
  const itemValue = React.useContext(AccordionItemValueContext)
  const isOpen = context.openItems.has(itemValue)

  if (!isOpen) return null

  return (
    <div className={cn(
      "overflow-hidden text-sm transition-all",
      className
    )}>
      <div className="pb-4 pt-0">
        {children}
      </div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }