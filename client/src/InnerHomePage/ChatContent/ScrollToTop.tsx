import UpButton from "../../assets/icons/UpButton.svg";

type ScrollToTopProps = {
    handleScrollToTop: () => void;
  };

export default function ScrollToTop({ handleScrollToTop }: ScrollToTopProps): JSX.Element {
 return (
    <div
      className="flex items-center mx-auto badge badge-outline badge-primary w-40 h-8 px-4 bg-base-300 text-primary cursor-pointer text-xs md:text-sm"
      onClick={handleScrollToTop}
    >
    <figure className="w-4 h-4 bg-primary mr-2">
        <img src={UpButton} alt="UpButton"/>
    </figure>
        Scroll to Top
    </div>
  )
}
