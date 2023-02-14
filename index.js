// Your code here
const firstEmployee = {
    firstName: 'Mark',
    familyName: 'Nosal',
    title: 'Janitor',
    payPerHour: 5,
    timeInEvents: [{
        type: 'TimeIn',
        hour: 1200,
        date: '1990-11-10',
    }, {
        type: 'TimeIn',
        hour: 1000,
        date: '1990-11-11',
    }],
    timeOutEvents: [{
        type: 'TimeIn',
        hour: 1600,
        date: '1990-11-10',
    }, {
        type: 'TimeIn',
        hour: 1700,
        date: '1990-11-11',
    }],
}


function createEmployeeRecord(employeeArray) {
    const newEmployee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return newEmployee
}

function createEmployeeRecords(employeeArrays) {
    const arrayOfEmployees = employeeArrays.map(employeeData => createEmployeeRecord(employeeData))
    return arrayOfEmployees
}

function createTimeInEvent(employeeObject, timeInStamp) {
    const timeInArray = timeInStamp.split(' ')
    const clockInEvent = {
        type: 'TimeIn',
        hour: parseInt(timeInArray[1], 10),
        date: timeInArray[0],
    }
    employeeObject.timeInEvents.push(clockInEvent)
    return employeeObject
}

function createTimeOutEvent(employeeObject, timeOutStamp) {
    const timeOutArray = timeOutStamp.split(' ')
    const clockOutEvent = {
        type: 'TimeOut',
        hour: parseInt(timeOutArray[1], 10),
        date: timeOutArray[0],
    }
    employeeObject.timeOutEvents.push(clockOutEvent)
    return employeeObject
}

function hoursWorkedOnDate(employeeObject, dateWorked) {
    const clockOutData = employeeObject.timeOutEvents.find((clockOutEvents) => {return (clockOutEvents.date === dateWorked)})
    const clockInData = employeeObject.timeInEvents.find((clockInEvents) => {return (clockInEvents.date === dateWorked)})
    const hoursWorked = (clockOutData.hour - clockInData.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employee, date){
    const hoursWorked = hoursWorkedOnDate(employee, date)
    // const payRate = employee.payPerHour
    const payOwed = hoursWorked * employee.payPerHour
    return payOwed
}

function allWagesFor(employee) {
    const allDatesWorked = employee.timeInEvents.map(event => event.date)
    const listOfHours = allDatesWorked.map(date => hoursWorkedOnDate(employee, date))
    const listOfEarnings = listOfHours.map(hours => hours * employee.payPerHour)
    const totalEarnings = listOfEarnings.reduce((total, currentDay) => total + currentDay)
    return totalEarnings
}

function calculatePayroll(employees) {
    const totalWagesByEmployee = employees.map(employee => allWagesFor(employee))
    const totalPayout = totalWagesByEmployee.reduce((total, employee) => total + employee)
    return totalPayout
}