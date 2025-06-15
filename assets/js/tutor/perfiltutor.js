// FLIP CARD
    const profileCard = document.getElementById('profileCard');
    document.getElementById('editPetsBtn').onclick = () => {
      profileCard.classList.add('card-flipped');
    };
    document.getElementById('backProfileBtn').onclick = () => {
      profileCard.classList.remove('card-flipped');
    };

    // FOTO UPLOAD
    document.getElementById('fotoInput').onchange = function(e) {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(ev) {
          document.getElementById('profileImg').src = ev.target.result;
        }
        reader.readAsDataURL(this.files[0]);
      }
    };
