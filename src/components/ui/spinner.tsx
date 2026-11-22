import { LoaderCircle } from "lucide-react"
import { cn } from "cn"

function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof LoaderCircle>) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      className={cn("size-5 animate-spin text-primary", className)}
      {...props}
    />
  )
}

export { Spinner }
