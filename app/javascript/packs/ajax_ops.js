function handle_ajax(event) {
  console.log('DOM fully loaded and parsed');
  const authHeader = localStorage.getItem("authHeader");
  const resultsDiv = document.getElementById('results-div');
  const restOpsDiv = document.getElementById('rest-ops');
  const listMembersButton = document.getElementById('list-members');
  const createMemberButton = document.getElementById('create-member');
  const firstName = document.getElementById('member-firstName');
  const lastName = document.getElementById('member-lastName');
  const updateMemberButton = document.getElementById('update-member');
  const memberID = document.getElementById('member-id');
  const firstName1 = document.getElementById('member-firstName1');
  const lastName1 = document.getElementById('member-lastName1');
  const members_path = 'http://localhost:3001/api/v1/members';

  //new const variables
  const deleteMemberButton = document.getElementById('delete-member');
  const memberIDDelete = document.getElementById('member-id-delete');
  const memberIDFacts = document.getElementById('member-id-facts');
  const memberIDAddFact = document.getElementById('member-id-add-fact')
  const listFactsButton = document.getElementById('list-facts');
  const createFactButton = document.getElementById('create-fact');
  const factText = document.getElementById('fact-text');
  const factLike = document.getElementById('fact-likes');
  const memberIDUpdateFact = document.getElementById('member-id-update-fact');
  const factText1 = document.getElementById('fact-text1');
  const factLike1 = document.getElementById('fact-likes1');
  const factID = document.getElementById('fact-id');
  const updateFactButton = document.getElementById('update-facts');
  const deleteFactButton = document.getElementById('delete-fact');
  const memberIDDeleteFact = document.getElementById('member-id-fact-delete');
  const factIDDelete = document.getElementById('fact-id-delete');

  restOpsDiv.addEventListener('click', (event) => {
    if (event.target === listMembersButton) {
      fetch(members_path,
          {  headers: { 'Content-Type': 'application/json',
          'authorization': authHeader } }
        ).then((response) => {
        if (response.status === 200) {
          resultsDiv.innerHTML = '';
          response.json().then((data) => {
            for (let i=0; i<data.length; i++) {
              let parag = document.createElement('P');
              parag.textContent = JSON.stringify(data[i]);
              resultsDiv.appendChild(parag);
            }
          });
        } else {
          alert(`Return code ${response.status} ${response.statusText}`);
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    } else if (event.target === createMemberButton) {
      var dataObject = {
        first_name: firstName.value,
        last_name: lastName.value
      }
      fetch(members_path,
        { method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === updateMemberButton) {
      var dataObject = {
        first_name: firstName1.value,
        last_name: lastName1.value
      }
      fetch(`${members_path}/${memberID.value}`,
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === deleteMemberButton) {
      fetch(`${members_path}/${memberIDDelete.value}`,
        { method: 'DELETE',
          headers: { 'Content-type': 'application/json',
            'authorization': authHeader },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            alert(`Member record successfully deleted ${response.status}`)
          })
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          })
        }
      })
    } else if (event.target === listFactsButton) {
      fetch(`${members_path}/${memberIDFacts.value}/facts`,
          {  headers: { 'Content-Type': 'application/json',
          'authorization': authHeader } }
        ).then((response) => {
        if (response.status === 200) {
          resultsDiv.innerHTML = '';
          response.json().then((data) => {
            for (let i=0; i<data.length; i++) {
              let parag = document.createElement('P');
              parag.textContent = JSON.stringify(data[i]);
              resultsDiv.appendChild(parag);
            }
          });
        } else {
          alert(`Return code ${response.status} ${response.statusText}`);
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    } else if (event.target === createFactButton) {
      var dataObjectFact = {
        fact_text: factText.value,
        likes: factLike.value
      }
      fetch(`${members_path}/${memberIDAddFact.value}/facts`,
        { method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader },
          body: JSON.stringify(dataObjectFact)
        }
      ).then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === updateFactButton) {
      var dataObjectFactUpdate = {
        fact_text: factText1.value,
        likes: factLike1.value
      }
      fetch(`${members_path}/${memberIDUpdateFact.value}/facts/${factID.value}`,
        { method: 'PUT',
          headers: { 'Content-Type': 'application/json',
            'authorization': authHeader },
          body: JSON.stringify(dataObjectFactUpdate)
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            resultsDiv.innerHTML = '';
            let parag = document.createElement('P');
            parag.textContent = JSON.stringify(data);
            resultsDiv.appendChild(parag);
          });
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          });
        }
      });
    } else if (event.target === deleteFactButton) {
      fetch(`${members_path}/${memberIDDeleteFact.value}/facts/${factIDDelete.value}`,
        { method: 'DELETE',
          headers: { 'Content-type': 'application/json',
            'authorization': authHeader },
          body: JSON.stringify(dataObject)
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            alert(`Member record successfully deleted ${response.status}`)
          })
        } else {
          response.json().then((data) => {
            alert(`Return code ${response.status} ${response.statusText} ${JSON.stringify(data)}`);
          }).catch((error) => {
            console.log(error);
            alert(error);
          })
        }
      })
    } 

  });
}
document.addEventListener('DOMContentLoaded', handle_ajax(event));
