export function start() {
    return /*html*/ `
        <div class="container mx-auto px-4 min-h-screen flex flex-col justify-center items-center max-w-[700px]">
          
            <c-chat></c-chat>
            
            <div class="flex justify-space-between w-full">
                <button id="submit-survey-button" class="rounded px-4 py-2 bg-zinc-800 text-zinc-100  mb-2 w-full mr-1">
                    Submit Survey
                </button>
                <button id="signout-button" class="rounded px-4 py-2 bg-zinc-200 text-zinc-800  mb-2 w-full ml-1">
                    SigninOut
                </button>
            </div>
            <div class="w-full relative h-24">
                 <div id='errormessage' class="flex justify-space-between w-full hidden px-4 py-2 rounded border border-red-400"></div>
            </div>
           
        </div>
    `
}

export const get = {
    submitButton: () => document.getElementById('submit-survey-button'),
    signoutButton: () => document.getElementById('signout-button')
}

export const set = {
    submitButtonToSubmitting: () => {
        const button = get.submitButton()
        button.innerHTML = 'Submitting...'
        button.disabled = true
    },

    submitButtonToDefault: () => {
        const button = get.submitButton()
        button.innerHTML = 'Submit Survey'
        button.disabled = false
    },

    errorMessageToActive: (message) => {
        const errormessage = document.getElementById('errormessage')
        errormessage.classList.remove('hidden')
        errormessage.innerHTML = message
    },

    errorMessageToInactive: () => {
        const errormessage = document.getElementById('errormessage')
        errormessage.classList.add('hidden')
        errormessage.innerHTML = ''
    }
}
