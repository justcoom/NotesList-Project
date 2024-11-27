const model = {
    notes: [
    // {
    //     name: "Заметка 1",
    //     description: "Описание заметки 1",
    //     id: Math.random(),
    //     isLike: false,
    // },
    // {
    //     name: "Заметка 2",
    //     description: "Описание заметки 2",
    //     id: Math.random(),
    //     isLike: false,
    // },
    // {
    //     name: "Заметка 3",
    //     description: "Описание заметки 3",
    //     id: Math.random(),
    //     isLike: false,
    // },
    // {
    //     name: "Заметка 4",
    //     description: "Описание заметки 4",
    //     id: Math.random(),
    //     isLike: false,
    // },
    // {
    //     name: "Заметка 5",
    //     description: "Описание заметки 5",
    //     id: Math.random(),
    //     isLike: false,
    // },
    // {
    //     name: "Заметка 6",
    //     description: "Описание заметки 6",
    //     id: Math.random(),
    //     isLike: false,
    // },
    // {
    //     name: "Заметка 7",
    //     description: "Описание заметки 7",
    //     id: Math.random(),
    //     isLike: false,
    // },
    // {
    //     name: "Заметка 8",
    //     description: "Описание заметки 8",
    //     id: Math.random(),
    //     isLike: false,
    // },
    // {
    //     name: "Заметка 9",
    //     description: "Описание заметки 9",
    //     id: Math.random(),
    //     isLike: false,
    // },
    // {
    //     name: "Заметка 10",
    //     description: "Описание заметки 10",
    //     id: Math.random(),
    //     isLike: false,
    // },
    ],

    isFiltered: false,
    selectedColor: "yellow",

    addNote(name, descriotion) {
        const newNote = {
            name: name,
            descriotion: descriotion,
            id: Math.random(),
            isLike: false,
            color: this.selectedColor,
        }

        this.notes.unshift(newNote)
        view.renderNotes(this.getNotes())
    },

    deleteNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId)
        view.renderNotes(this.getNotes())
    },

    addLike(noteId) {
        this.notes = this.notes.map(note => {
            if (note.id === noteId) {
                note.isLike = !note.isLike
            }
            return note
        })

        view.renderNotes(this.getNotes())
    },
    
    likesFilter() {
       this.isFiltered = !this.isFiltered
       view.renderNotes(this.getNotes())
    },
    // корректно ли такое решение
    getNotes () {
        return this.isFiltered ? this.notes.filter(note => note.isLike) : this.notes
    },

    counterNote () {
        return this.notes.length
    }

};

const view = {
    init() {
        view.renderNotes(model.notes)

        const form = document.querySelector('.form')
        const nameInput = document.querySelector('.input-name')
        const descriptionInput = document.querySelector('.input-description')
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const nameNote = nameInput.value
            const descriptionNote = descriptionInput.value
            controller.addNote(nameNote, descriptionNote, nameInput, descriptionInput)

        })

        const note = document.querySelector(".note-block")
        note.addEventListener('click', e => {
            if(e.target.classList.contains('trash-icon')) {
                const noteId = +e.target.closest(".note").id
                controller.deleteNote(noteId)
            }

            if(e.target.classList.contains("like-icon")) {
                const noteId = +e.target.closest(".note").id
                controller.addLike(noteId)
            }
        })

        const checkbox = document.querySelector('.checkbox')
        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('active')
            controller.likesFilter()
        })

        const ul = document.querySelector(".ul")
        ul.addEventListener("click", (e) => {
            if (e.target.classList.contains("color")) {
                const colors = document.querySelectorAll("li")
                colors.forEach((color) => color.classList.remove("selected"))

                e.target.closest("li").classList.add("selected")

                model.selectedColor = e.target.classList[1]
            }
        })
    },

    renderNotes(notes) {
    const NoteBlock = document.querySelector(".note-block");
    noteHTML = "";
    notes.forEach((note) => {
      noteHTML += `
                <div class="note ${note.isLike ? "like" : ""}" id="${note.id}">
                <div class="header-note ${note.color}">
                    <p class="text-header-note">${note.name}</p>
                    <div class="wrapper-header-note">
                        <img src="./assets/images/${note.isLike ? "heart active.png" : "heart inactive.png"}" alt="heart icon" class="like-icon">
                        <img src="./assets/images/trash.png" alt="trash icon" class="trash-icon">
                    </div>
                </div>
                <div class="note-description">
                    <p class="text-note">${note.descriotion}</p>
                </div>
                </div>`;
    });

    NoteBlock.innerHTML = noteHTML;

    const likesFilter = document.querySelector('.likes-filter')
    if(notes.length === 0) {
        NoteBlock.innerHTML = `
                <div class="text-without-notes">
                    <p>У вас нет еще ни одной заметки</p>
                    <p>Заполните поля выше и создайте свою первую заметку!</p>
                </div>`
    } else {
        likesFilter.style.display = 'flex'
    }

    controller.counterNote()


  },
};

const controller = {
    addNote(nameNote, descriptionNote, nameInput, descriptionInput) {
        if (nameNote.trim() !== "" && descriptionNote.trim() !== "" && nameNote.length < 50) {
            model.addNote(nameNote, descriptionNote)

            const addMessage = document.querySelector('.add-message')
            addMessage.classList.add('active')

            setTimeout(() => {
                addMessage.classList.remove('active')
            }, 3000)
            
            console.log(nameNote);
            
            nameInput.value = "";
            descriptionInput.value = "";

        } else if (nameNote.length > 50) {
            const lengthMessage = document.querySelector(".max-length-message")
            lengthMessage.classList.add("active")

            timerId = setTimeout(() => {
                lengthMessage.classList.remove("active")
            }, 3000);
        } else {
            const fillMessage = document.querySelector(".fill-message")
            fillMessage.classList.add("active")

            timerId = setTimeout(() => {
                fillMessage.classList.remove("active")
            }, 3000);

        }
    },

    deleteNote(noteId) {
        model.deleteNote(noteId)
        const deleteMessage = document.querySelector(".delete-message")
        deleteMessage.classList.add("active")
        setTimeout(() => {
            deleteMessage.classList.remove("active")
        }, 3000)
    },

    addLike(noteId) {
        model.addLike(noteId)
    },

    likesFilter() {
        model.likesFilter()
    },

    counterNote() {
        const counter = document.querySelector('.number')
        counter.textContent = `${model.counterNote()}`
    }
};

const init = () => {
    view.init()
}

init()
