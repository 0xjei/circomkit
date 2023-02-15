import {compileCircuit} from '../utils';
import {Circuit} from '../utils/circuit';
import type {FullProof} from '../types/circuit';
import type {WasmTester} from '../types/wasmTester';
import {assert, expect} from 'chai';

const CIRCUIT_NAME = 'multiplier';
describe(CIRCUIT_NAME, () => {
  const INPUT = {
    in: [2n, 4n, 6n],
  };

  describe('functionality', () => {
    let circuit: WasmTester;

    before(async () => {
      circuit = await compileCircuit(CIRCUIT_NAME);
    });

    it('should compute correctly', async () => {
      // compute witness
      const witness = await circuit.calculateWitness(INPUT, true);

      // witness should have valid constraints
      await circuit.checkConstraints(witness);

      // witness should have correct output
      const output = {
        out: BigInt(INPUT.in.reduce((prev: bigint, acc: bigint) => acc * prev)),
      };
      await circuit.assertOut(witness, output);
    });

    it('should NOT compute with wrong number of inputs', async () => {
      try {
        await circuit.calculateWitness(
          {
            in: INPUT.in.slice(1), // fewer inputs
          },
          true
        );
        assert.fail('expected to fail on fewer inputs');
      } catch (err) {}

      try {
        await circuit.calculateWitness(
          {
            in: [2n, ...INPUT.in], // more inputs
          },
          true
        );
        assert.fail('expected to fail on too many inputs');
      } catch (err) {}
    });
  });

  describe('validation', () => {
    let fullProof: FullProof;

    const circuit = new Circuit(CIRCUIT_NAME);

    before(async () => {
      fullProof = await circuit.prove(INPUT);
    });

    it('should verify', async () => {
      expect(await circuit.verify(fullProof.proof, fullProof.publicSignals)).to.be.true;
    });

    it('should NOT verify a wrong multiplication', async () => {
      // just give a prime number, assuming there are no factors of 1
      expect(await circuit.verify(fullProof.proof, ['13'])).to.be.false;
    });
  });
});
