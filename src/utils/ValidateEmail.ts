const ValidateEmail = (email: string) => {
    const validRegex: RegExp = /^[\w-]([.]?[\w-])+@([\w-]+\.)+[\w-]{2,}$/;
    if (email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

export default ValidateEmail