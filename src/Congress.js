import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMemberInfo, setTreaty, setError } from './slices/CongressSlice';
import { selectCongressMemberInfo } from './slices/CongressSlice'; 

function Congress() 
{
  //state variables for member stuff - george
  const dispatch = useDispatch();
  const { memberInfo, treaty, error } = useSelector((state) => state.congress);

  const [userSearchMember, setUserSearchMember] = useState('K000377'); //just an example of input
  const [isLoading, setIsLoading] = useState(false);

  const congressMemberInfo = useSelector(selectCongressMemberInfo);

  //state variables for treaty stuff - kazi
  const [treatyInput, setTreatyInput] = useState('91'); //just an example of input
  const [trans, setTreatyTrans] = useState(null);
  //const [rat, setTreatyRat] = useState(null);

  //function to fetch member data - george
  const fetchPartyData = async (name) => 
  {
    setIsLoading(true);
    setError(null);
  
    try 
    {
      const response = await fetch(`https://api.congress.gov/v3/member/${encodeURIComponent(name)}?api_key=${process.env.REACT_APP_API_KEY}`); //fetch data from the API, env file stores the api key
      
      if (!response.ok) //check if api fetch was successfu or not
      {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the response contains items
      let objectLength = Object.keys(data.member).length;

      if (data.member && objectLength > 0) 
      {
        const member = data.member;
      
        dispatch(setMemberInfo({
          fullName: member.directOrderName,
          photo: member.depiction.imageUrl,
          state: member.state,
          party: member.partyHistory[0].partyName,
          memberType: member.terms.pop().memberType
        }))
        
      } 
      
      else 
      {
        //if no information found
        dispatch(setError("No information not found for this member."))
      }
    } 
    
    catch (e) 
    {
      if (e.name === "TypeError" && e.message === "Failed to fetch") //network error catch
      {
        dispatch(setError("Network error. Please check your internet connection."));

      } 
      
      else 
      {
        dispatch(setError(`Failed to fetch data: ${e.message}`));
      }
      
      console.error(e); //log it
    }
  
    setIsLoading(false); //false if u encounter an error  //////
  };

  const handleSubmit = (event) => 
  {
    event.preventDefault();
    fetchPartyData(userSearchMember); //call function to fetch member data  ////
    dispatch(setMemberInfo(null)); // Reset member state
    dispatch(setError(null)); // Reset error state
  };

  const handleMemberNameChange = (event) => 
  {
    setUserSearchMember(event.target.value); //update member name state with input value
  };

  //fetch treaty data
  const fetchTreatyData = async (input) => 
  {
    setIsLoading(true); //same explanation as member func
    setError(null);
  
    try 
    {
      //fetch data from the API, env file stores the api key
      const response = await fetch(`https://api.congress.gov/v3/treaty/${encodeURIComponent(input)}?api_key=${process.env.REACT_APP_API_KEY}`);

      if (!response.ok) //is api call successful
      {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();//parse
  
      if (data.treaties && data.treaties.length > 0) //extract info
      {
        const treaty = data.treaties[0];

        dispatch(setTreaty({
          treatySubject: treaty.treatySubject,
          transmittedDate:treaty.transmittedDate
        }))
      } 
      
      else 
      {
        dispatch(setError("No information not found for this member."))
      }
    } 
    
    catch (e) 
    {
      console.error(e); //log error
      dispatch(setError(`Failed to fetch treaty data: ${e.message}`));
    }
  
    setIsLoading(false);
  };

  //event handler for submitting the treaty form
  const handleTreatySubmit = (event) => 
  {
    event.preventDefault();
    fetchTreatyData(treatyInput);
    dispatch(setTreaty(null)); // Reset treaty state
    dispatch(setError(null)); // Reset error state
  };

  //event handler for updating the treaty input field
  const handleTreatyInputChange = (event) => 
  {
    setTreatyInput(event.target.value);
  };
  
    return (
      <div className="center-container">
      <div>
        <h1>United States Congress Page</h1>

        <h3>Congress Member Information</h3>
        <p>What to input?</p>
        <p>There exisit a unique identification for each member of Congress. This is the BioGuide ID from the Biographical Directory of Congress: <a href="http://bioguide.congress.gov">bioguide.congress.gov</a> It is alphanumeric and begins with the first letter of the Member's last name, followed by six (6) numeric digits. </p>

        <h5> Sample inputs: K000377, L000174, W000817, S001191, T000278</h5>
      <form onSubmit={handleSubmit}>
      <div className="member-name-section">
        <label>
          Enter Congress Member BioGuide ID:   
          <input
            type="text"
            value={userSearchMember}
            onChange={handleMemberNameChange}
          />
        </label>
        <button type="submit">Search</button>
      </div>
      </form>
      
      {congressMemberInfo && (
         <div>
         <img src={memberInfo.photo}/>
         <p>Full Member Name: {memberInfo.fullName}</p>
         <p>Member Type: {memberInfo.memberType}</p>
         <p>State: {memberInfo.state}</p>
         <p>Party: {memberInfo.party}</p>
       </div>
      )}


      <br></br>

      <br></br>
      <br></br>
      <h3>Treaty Information</h3>
      <p>What to input?</p>
      <p>When CSPAN or any other broadcasting network mentions that you are watching the 116th Congress in session, it means that they are broadcasting or airing live or recorded sessions of the legislative body. The number refers to the specific congressional session that was in operation during a certain period. In the context of the United States, the U.S. Congress operates in two-year periods called sessions, and each session is numbered consecutively.</p>
      <h5> Possible inputs: Congressional Sessions 91 through 117</h5>
      <p>Note: During some congressional sessions treaties may not have been enacted</p>
      <form onSubmit={handleTreatySubmit}>
      <div className="member-name-section">
        <label>
          Enter Congressional Session Number:
          <input
            type="text"
            value={treatyInput}
            onChange={handleTreatyInputChange}
          />
        </label>
        <button type="submit">Search</button>
      </div>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {treaty && (
        <div>
          <p>Treaty Subject: {treaty.treatySubject}</p>
          <p>Transmitted Date: {treaty.transmittedDate}</p>
          
      </div>
      )}
      <br></br>

      <br></br>
      <br></br>
      <p>I want to</p>
      <div className="linkText">
        <Link to="/API-app/parliament">explore the UK parliament</Link>
        <Link to="/API-app">go back to the homepage</Link>
      </div>

      </div>
      </div>
    );
}

export default Congress;