function calcularMedia(numeros) {
    if (numeros.length === 0) return 0;

    const soma = numeros.reduce((acc, num) => acc + num, 0);
    return soma / numeros.length;
}

// Exemplo de uso
const numeros = [10, 20, 30, 40];
const media = calcularMedia(numeros);
console.log(`A média é: ${media}`);

