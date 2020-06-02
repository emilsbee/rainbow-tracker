export const matchColor = ({type, data}) => {
    switch (type) {
        case 'ACTIVITY':
            if (data === 'co') {
                return '-M8juLkJGb0HYcVUp1hf'
            } else if (data === 'd') {
                return '-M8juLkJGb0HYcVUp1hg'
            } else if (data === 't') {
                return '-M8juLkJGb0HYcVUp1hh'
            } else if (data === 'undefined') {
                return ''
            } else if (data === 'e') {
                return '-M8juLkKKWE7GmitaWD-'
            } else if (data === 'm') {
                return '-M8juLkKKWE7GmitaWD0'
            } else if (data === 'r') {
                return '-M8juLkKKWE7GmitaWD1'
            } else if (data === 'ed') {
                return '-M8ojGzaNX5xr7HqpY4z'
            } else if (data === 'o') {
                return '-M8juLkKKWE7GmitaWD3'
            } else if (data === 'pr') {
                return '-M8juLkL1Nw0-Snc1iVM'
            } else if (data === 'r') {
                return '-M8juLkL1Nw0-Snc1iVN'
            } else if (data === 'ss') {
                return '-M8juLkL1Nw0-Snc1iVO'
            } else if (data === 'sw') {
                return '-M8juLkL1Nw0-Snc1iVP'
            } else if (data === '') {
                return ''
            }
            break;

        case 'CATEGORY': 
            if (data === 'sleep') {
                return '-M8juLkL1Nw0-Snc1iVQ'
            } else if (data === 'havetos') {
                return '-M8juLkJGb0HYcVUp1he'
            } else if (data === 'leisure') {
                return '-M8juLkKKWE7GmitaWCz'
            } else if (data === 'undefined') {
                return ''
            } else if (data === 'work') {
                return '-M8juLkKKWE7GmitaWD2'
            }
    }
}

export const weeks2019 = [
    { f: 1, r: 23 },  { f: 2, r: 24 },
    { f: 3, r: 25 },  { f: 4, r: 26 },
    { f: 5, r: 27 },  { f: 6, r: 28 },
    { f: 7, r: 29 },  { f: 8, r: 30 },
    { f: 9, r: 31 },  { f: 10, r: 32 },
    { f: 11, r: 33 }, { f: 12, r: 34 },
    { f: 13, r: 35 }, { f: 14, r: 36 },
    { f: 15, r: 37 }, { f: 16, r: 38 },
    { f: 17, r: 39 }, { f: 18, r: 40 },
    { f: 19, r: 41 }, { f: 20, r: 42 },
    { f: 21, r: 43 }, { f: 22, r: 44 },
    { f: 23, r: 45 }, { f: 24, r: 46 },
    { f: 25, r: 47 }, { f: 26, r: 48 },
    { f: 27, r: 49 }, { f: 28, r: 50 },
    { f: 29, r: 51 }, { f: 30, r: 52 }
]

export const weeks2020 = [
    { f: 31, r: 1 },  { f: 32, r: 2 },
    { f: 33, r: 3 },  { f: 34, r: 4 },
    { f: 35, r: 5 },  { f: 36, r: 6 },
    { f: 37, r: 7 },  { f: 38, r: 8 },
    { f: 39, r: 9 },  { f: 40, r: 10 },
    { f: 41, r: 11 }, { f: 42, r: 12 },
    { f: 43, r: 13 }, { f: 44, r: 14 },
    { f: 45, r: 15 }, { f: 46, r: 16 },
    { f: 47, r: 17 }, { f: 48, r: 18 },
    { f: 49, r: 19 }, { f: 50, r: 20 },
    { f: 51, r: 21 }, { f: 52, r: 22 }
]

export const dayConversion = {
    Monday: 'day1',
    Tuesday: 'day2',
    Wednesday: 'day3',
    Thursday: 'day4',
    Friday: 'day5',
    Saturday: 'day6',
    Sunday: 'day7'
} 