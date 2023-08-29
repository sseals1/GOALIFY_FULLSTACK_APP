const handleRegister = (e) => {
    e.preventDefault();
    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch("https://localhost:5001/api/Users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("goal_keeper", createdUser.id);
              history.push("/");
            }
          });
      } else {
        // Now, only show the modal if userExists is true
        if (userExists) {
          conflictDialog.current.showModal();
        }
      }
    });
  };