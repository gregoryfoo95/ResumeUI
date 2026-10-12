// Opens the browser print dialog; print CSS shows only #print-resume.
export function printResume(): void {
  const prevTitle = document.title;
  document.title = "Gregory Foo - Resume";
  const restore = () => {
    document.title = prevTitle;
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  window.print();
}
