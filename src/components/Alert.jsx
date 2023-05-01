import CrossIcon from "@mui/icons-material/Close";
import { css, style, tx } from "@twind/core";
import { useSnackbar } from "notistack";
import { forwardRef } from "react";

const notificationStyles = style({
  base: tx(
    "max-w-[350px] w-full h-12 font-nunitoSans text-sm font-medium text-white py-2 px-4 rounded-lg flex gap-3 items-center"
  ),
  props: {
    variant: {
      success: css({
        background: "linear-gradient(90deg, #359C11 14.62%, #39E736 119.74%)",
      }),
      info: css({
        background: "linear-gradient(90deg, #1E38C1 14.62%, #48A6FC 119.74%)",
      }),
      error: css({
        background: "linear-gradient(90deg, #C51919 14.62%, #F02995 119.74%)",
      }),
      warning: css({
        background: "linear-gradient(90deg, #C27F1B 14.62%, #ECC436 119.74%)",
      }),
    },
  },
});

export const Alert = forwardRef(({ variant, id, message }: any, ref: any) => {
  const { closeSnackbar } = useSnackbar();

  const handleCloseClick = () => {
    closeSnackbar(id);
  };

  return (
    <div ref={ref} className={tx(notificationStyles({ variant }))}>
      {message}

      <CrossIcon
        onClick={handleCloseClick}
        className={tx("text-white! text-xl! cursor-pointer ml-auto")}
      />
    </div>
  );
});

Alert.displayName = "Alert";
