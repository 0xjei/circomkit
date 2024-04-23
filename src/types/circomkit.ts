import type {LogLevelDesc} from 'loglevel';

/**
 * Primes supported by Circom, as described for the `-p` option.
 * @see https://github.com/iden3/circom/blob/master/program_structure/src/utils/constants.rs
 */
export type CircomkitPrimes = 'bn128' | 'bls12381' | 'goldilocks' | 'grumpkin' | 'pallas' | 'vesta' | 'secq256r1';

export type CircomkitProtocol = 'groth16' | 'plonk' | 'fflonk';

export type CircomkitConfig = {
  /** Protocol to be used. */
  protocol: CircomkitProtocol;
  /** Underlying prime field. */
  prime: CircomkitPrimes;
  /** Circuit configurations path. */
  circuits: string;
  /** Directory to read circuits from. */
  dirCircuits: string;
  /** Directory to read inputs from. */
  dirInputs: string;
  /** Directory to download PTAU files. */
  dirPtau: string;
  /** Directory to output circuit build files. */
  dirBuild: string;
  /** Path to circom executable */
  circomPath: string;
  /** Number of contributions */
  groth16numContributions: number;
  /** Ask user input to create entropy */
  groth16askForEntropy: boolean;
  /** Version number for main components. */
  version: `${number}.${number}.${number}`;
  /**
   * [Optimization level](https://docs.circom.io/getting-started/compilation-options/#flags-and-options-related-to-the-r1cs-optimization).
   * - `0`: No simplification is applied.
   * - `1`: Only applies `var` to `var` and `var` to `constant` simplification.
   * - `2`: Full constraint simplificiation via Gaussian eliminations.
   * - `>2`: Any number higher than 2 will use `--O2round` with the number as simplification rounds.
   */
  optimization: number;
  /** Does an additional check over the constraints produced. */
  inspect: boolean;
  /** Include paths as libraries during compilation. */
  include: string[];
  /** Pass logger to SnarkJS to see its logs in addition to Circomkit. */
  verbose: boolean;
  /** Log level used by the internal logger. */
  logLevel: LogLevelDesc;
  /** Whether to generate the C witness calculator. */
  cWitness: boolean;
  /** Whether to print Solidity copy-pasteable calldata. */
  prettyCalldata: false;
};

/** Shorthand notations for which path to build in Circomkit. These paths require a circuit name. */
export type CircuitPathBuilders = 'main' | 'sym' | 'pkey' | 'vkey' | 'wasm' | 'sol' | 'dir' | 'r1cs';

/** Shorthand notations for which path to build in Circomkit. These paths require a circuit name and input name. */
export type CircuitInputPathBuilders = 'pubs' | 'proof' | 'wtns' | 'in' | 'dir';

export type CircomkitConfigOverrides = Partial<CircomkitConfig>;
