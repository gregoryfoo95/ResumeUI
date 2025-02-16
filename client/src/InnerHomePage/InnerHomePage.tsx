import InnerHomePageWindow from "./InnerHomePageWindow";
import SuccessHack from "./SuccessHack";
import InfoBar from "./InfoBar";

export default function InnerHomePage(): JSX.Element {
  return (
    <div className="flex flex-col gap-y-4 my-10">
      <InfoBar />
      <SuccessHack />
      <InnerHomePageWindow />
    </div>
  );
}
