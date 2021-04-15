const Add = ({newName, newPhone, handleNameChange, handlePhoneChange, addPerson}) => {
  return (
    <form>
      <div>
        New Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newPhone} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>Add</button>
      </div>
    </form>
  )
}

export default Add;
