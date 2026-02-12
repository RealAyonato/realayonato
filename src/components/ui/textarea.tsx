import * as React from "react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextareaElement> {}

const Textarea = React.forwardRef<HTMLTextareaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[150px] w-full rounded-md border-2 border-gray-800 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }