export default class Day16 {

  private _hexToBin: { [key: string]: string; } = {
    0: '0000',
    1: '0001',
    2: '0010',
    3: '0011',
    4: '0100',
    5: '0101',
    6: '0110',
    7: '0111',
    8: '1000',
    9: '1001',
    A: '1010',
    B: '1011',
    C: '1100',
    D: '1101',
    E: '1110',
    F: '1111'
  };

  private _binaryString: string;

  private _versions: number[] = [];

  public solve(input: string): { part1: any, part2: any; } {
    this._binaryString = input.split('').map(hex => this._hexToBin[hex]).join('');

    const info = this._decodePackage();

    const part1VersionTotal = this._versions.reduce((x, a) => x + a);

    return { part1: part1VersionTotal, part2: info.value };
  }

  private _decodePackage() {
    let packageLength = 0;
    let packageValue = 0;
    this._versions.push(parseInt(this._binaryString.slice(0, 3), 2));
    const typeID = parseInt(this._binaryString.slice(3, 6), 2);
    this._binaryString = this._binaryString.slice(6);
    packageLength += 6;
    if (typeID === 4) {
      let binaryValue = '';
      let moreToRead = false;
      do {
        moreToRead = this._binaryString.slice(0, 1) === '1' ? true : false;
        binaryValue += this._binaryString.slice(1, 5);
        this._binaryString = this._binaryString.slice(5);
        packageLength += 5;
      } while (moreToRead);
      packageValue = parseInt(binaryValue, 2);
    } else {
      const values = [];
      const lengthTypeId = parseInt(this._binaryString.slice(0, 1), 2);
      this._binaryString = this._binaryString.slice(1);;
      packageLength += 1;
      if (lengthTypeId === 0) {
        const subPackagesLength = parseInt(this._binaryString.slice(0, 15), 2);
        this._binaryString = this._binaryString.slice(15);
        packageLength += 15;
        let resolvedLength = 0;
        do {
          let info = this._decodePackage();
          values.push(info.value);
          packageLength += info.length;
          resolvedLength += info.length;
        } while (resolvedLength < subPackagesLength);
      } else {
        const packageCount = parseInt(this._binaryString.slice(0, 11), 2);
        this._binaryString = this._binaryString.slice(11);
        packageLength += 11;
        for (let i = 0; i < packageCount; i++) {
          const info = this._decodePackage();
          values.push(info.value);
          packageLength += info.length;
        }
      }

      switch (typeID) {
        case 0:
          packageValue = values.reduce((x, a) => x + a);
          break;
        case 1:
          packageValue = values.reduce((x, a) => x * a);
          break;
        case 2:
          packageValue = values.sort((a, b) => a - b)[0];
          break;
        case 3:
          packageValue = values.sort((a, b) => a - b).reverse()[0];
          break;
        case 5:
          if (values[0] > values[1]) {
            packageValue = 1;
          } else {
            packageValue = 0;
          }
          break;
        case 6:
          if (values[0] < values[1]) {
            packageValue = 1;
          } else {
            packageValue = 0;
          }
          break;
        case 7:
          if (values[0] === values[1]) {
            packageValue = 1;
          } else {
            packageValue = 0;
          }
          break;
      }
    }
    return { length: packageLength, value: packageValue };
  }
}
