import "./ScrollToTopComponent.css";

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
