import { Search, Map, Code, Rocket } from "lucide-react"

const iconMap = {
  search: Search,
  map: Map,
  code: Code,
  rocket: Rocket
}

interface IconProps {
  name: keyof typeof iconMap
  className?: string
}

export function Icon({ name, className }: IconProps) {
  const IconComponent = iconMap[name]
  return <IconComponent className={className} />
} 