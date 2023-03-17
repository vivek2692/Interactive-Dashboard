const Navigation = (props) => {
  return (
    <div className="multistep-form-nav">
      <button className="multistep-form-btn" onClick={props.prev}>
        Previous
      </button>
      <button className="multistep-form-btn" onClick={props.next}>
        Next
      </button>
    </div>
  );
};

export const config = {
  navigation: {
    component: Navigation,
    location: "after", // or after
  },
};
