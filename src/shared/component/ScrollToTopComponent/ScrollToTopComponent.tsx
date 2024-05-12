import "./ScrollToTopComponent.css";

// ScrollToTopComponent is a functional component that renders a button to scroll to the top of the page.
const ScrollToTopComponent = () => {
  return (
    <>
      <div
        className="to-top"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        ⤒
      </div>
    </>
  );
};

export default ScrollToTopComponent;
