import ArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Select as MuiSelect } from "@mui/material";
import { tw } from "twind";
import { css } from "twind/css";

export const Select = ({ children, label, id, errorMessage, ...rest }) => {
  return (
    <div className={tw("flex w-full flex-col gap-1")}>
      {label && (
        <label
          htmlFor={id}
          className={tw("text-sm text-white m-0! p-0! font-semibold")}
        >
          {label}
        </label>
      )}
      <MuiSelect
        id={id}
        disableUnderline
        IconComponent={(props) => (
          <ArrowDown
            {...props}
            className={tw(
              "text-lg! absolute! right-0 mr-5! !text-gray-400",
              props.className
            )}
          />
        )}
        variant="standard"
        className={tw(
          "rounded-none!",
          css({ background: "rgba(255, 255, 255, 0.1)" })
        )}
        classes={{
          standard: tw("pl-2! pr-20! py-2!"),
          select: tw("text-base! text-white! text-sm! font-regular!"),
          iconStandard: tw("absolute! mr-3!"),
        }}
        {...rest}
      >
        {children}
      </MuiSelect>
      {errorMessage && (
        <p className={tw("text-xs -mt-1 font-semibold text-red-400")}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
