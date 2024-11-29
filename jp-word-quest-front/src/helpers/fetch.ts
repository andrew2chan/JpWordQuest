export const fetchGetOptions = async (jlptLevel: string) => {
    const data = await fetch(`http://localhost:8080/getOptions/${jlptLevel}`, {
        "method": "GET",
    });

    return data.json();
}