const Notification = ({ message, type }) => {
  if(message === null) { return null };

  const style = {
    color: type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 18,
    borderStyle: "solid",
    borderRadius: 3,
    padding: 5,
    marginBottom: 5
  };

  return (
    <div>
      <div style={style}>
        {message}
      </div>
    </div>
  )
}

export default Notification
