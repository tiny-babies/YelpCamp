const starInput = document.querySelector('input[type="radio"]');
const form = document.querySelector('#reviewForm');

if(form){
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity() || starInput.checked) {


            if (starInput.checked) {
                const main = document.querySelector('main');
                const findExistingFlash = document.querySelector('div[role="alert"]');

                if (findExistingFlash) {
                    main.removeChild(findExistingFlash);
                }



                const flash = document.createElement('div');
                flash.classList.add('alert');
                flash.classList.add('alert-danger');
                flash.classList.add('alert-dismissible');
                flash.classList.add('fade');
                flash.classList.add('show');
                flash.setAttribute('role', 'alert');
                const button = document.createElement('button');
                button.setAttribute('type', 'button');
                button.classList.add('btn-close');
                button.setAttribute('data-bs-dismiss', 'alert');
                button.setAttribute('aria-label', 'Close');

                flash.append("Please Rate the Review!")
                flash.append(button);
                main.prepend(flash);

            }
            event.preventDefault()
            event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)
}
