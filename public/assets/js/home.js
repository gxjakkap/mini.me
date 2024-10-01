function getAge(){
    const birthDay = new Date('September 25, 2005, 00:00:00')
    const today = new Date()
    const diff = ((today.getTime() - birthDay.getTime()) / 1000) / (60*60*24)
    return Math.abs(Math.floor(diff / 365.25))
}

const ageSpan = document.getElementById("age")

ageSpan.innerText = `${getAge()}`