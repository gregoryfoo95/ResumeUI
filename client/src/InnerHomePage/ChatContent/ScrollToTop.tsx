import UpButton from "../../assets/icons/UpButton.svg";

type ScrollToTopProps = {
    handleScrollToTop: () => void;
  };

export default function ScrollToTop({ handleScrollToTop }: ScrollToTopProps): JSX.Element {
 return (
    <div
      className="flex items-center mx-auto badge badge-outline border-primary w-40 h-8 px-4 bg-primary text-white cursor-pointer text-xs md:text-sm"
      onClick={handleScrollToTop}
    >
    <figure className="w-4 h-4 mr-2">
        <img className="" src={UpButton} alt="UpButton"/>
    </figure>
        Scroll to Top
    </div>
  )
}
