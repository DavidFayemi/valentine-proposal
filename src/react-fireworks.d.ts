declare module "react-fireworks" {
  import { ComponentType } from "react";

  interface FireworksProps {
    autostart?: boolean;
    width?: number;
    height?: number;
  }

  const Fireworks: ComponentType<FireworksProps>;
  export default Fireworks;
}
