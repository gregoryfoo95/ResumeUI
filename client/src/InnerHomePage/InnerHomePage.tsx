import InnerHomePageWindow from "./InnerHomePageWindow";
import SuccessHack from "./SuccessHack";
import InfoBar from "./InfoBar";
import PrintResume from "../components/PrintResume";

export default function InnerHomePage(): JSX.Element {
  return (
    <>
      <div className="my-10 flex flex-col gap-y-4 print:hidden">
        <InfoBar />
        <SuccessHack />
        <InnerHomePageWindow />
      </div>
      <PrintResume />
    </>
  );
}
