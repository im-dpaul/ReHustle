const CapitalizeFirstWord = (words: string) => {
    let capWords = ''
    let localWordList: string[] = []
    const wordsList: string[] = words.split(' ')

    wordsList.forEach((word) => {
        let localWord = word.charAt(0).toUpperCase() + word.substring(1)
        localWordList.push(localWord)
    })
    capWords = localWordList.join(' ')

    return capWords
}

export default CapitalizeFirstWord