import React, { SelectHTMLAttributes, ForwardedRef } from "react";
import { cn } from "@utils/cn";

interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;
  options: SelectItem[];
  label?: string;
  name: string;
  hideDefault?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      containerClassName = "",
      options = [],
      className,
      label = "",
      name,
      hideDefault = false,
      ...props
    },
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <div className={cn("w-full flex flex-col gap-2", containerClassName)}>
        {label && (
          <label htmlFor={name}>
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
        )}

        <select
          ref={ref}
          defaultValue=""
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          {...{ name, id: name }}
          {...props}
        >
          {!hideDefault && (
            <option disabled value="">
              Select from below
            </option>
          )}

          {options.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
