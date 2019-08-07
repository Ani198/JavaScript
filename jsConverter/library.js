function Converter(value, fromType, toType) {
    //types - celsius, fahrenheit, kelvin
    let convertedValue;
    switch (fromType) {
        case "celsius":
            switch (toType) {
                case "celsius":
                    return String(value) + " It's the same type(Celsius) :(";
                case "fahrenheit":
                    let cel = String(value) + " Celsius -> ";
                    let fahr = String(Math.round(9/5 * value + 32))+" Fahrenheit";
                    return cel + fahr;
                case "kelvin":
                    let cel1 = String(value) + " Celsius -> ";
                    let kelv = String(Math.round(value + 273)) + " Kelvin";
                    return cel1 + kelv;
                default:
                    return "There is no sush type";
            }
            break;
        case "fahrenheit":
            switch (toType) {
                case "celsius":
                    let fahr = String(value) + " Fahrenheit -> ";
                    let cel = String(Math.round(5/9 * (value - 32))) + " Celsius";
                    return fahr + cel;
                case "fahrenheit":
                    return String(value) + " It's the same type(Fahrenheit) :(";
                case "kelvin":
                    let fahr1 = String(value) + " Fahrenheit -> ";
                    let kelv = String(Math.round(5/9 * (value - 32) + 273)) + " Kelvin";
                    return fahr1 + kelv;
                default:
                    alert("There is no sush type")
            }
            break;
        case "kelvin":
            switch (toType) {
                case "celsius":
                    let kelv = String(value) + " Kelvin -> ";
                    let cel = String(Math.round(value - 273)) + " Celsius";
                    return kelv + cel;
                case "fahrenheit":
                    let kelv1 = String(value) + " Kelvin -> ";
                    let fahr = String(Math.round(9/5 * (value - 273) + 32))+" Fahrenheit";
                    return kelv1 + fahr;
                case "kelvin":
                    return String(value) + " It's the same type(Kelvin) :(";
                default:
                    alert("There is no sush type")
            }
            break;
        default:
            alert("There is no sush type")
    }
    return convertedValue;
}