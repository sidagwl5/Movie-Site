import React, { forwardRef, isValidElement } from "react";
import { tw, css } from "twind/style";

export const TextInput = forwardRef(
  ({ label, errorMessage, className, labelComponent, ...rest }, ref) => {
    return (
      <section className={tw("flex flex-col w-full gap-1 sm:gap-2")}>
        {isValidElement(labelComponent)
          ? labelComponent
          : label && (
              <label
                htmlFor={rest.id}
                className={tw("text-sm text-white m-0! p-0! font-semibold")}
              >
                {label}
              </label>
            )}
        <input
          className={tw(
            "h-10 text-white! px-2 text-sm",
            css({ background: "rgba(255, 255, 255, 0.1)" }),
            className
          )}
          type="text"
          {...rest}
          ref={ref}
        />
        {errorMessage && (
          <p className={tw("text-xs font-semibold text-red-400")}>
            {errorMessage}
          </p>
        )}
      </section>
    );
  }
);
