// Imports
// ---------------------------------------------------------------------------------------------------------------------
// $FlowFixMe
import { HOST, PORTS } from '../../../../constants/settings';

// Paths
// ---------------------------------------------------------------------------------------------------------------------
export const EXPRESS_PATH = `http://${HOST}:${PORTS.EXPRESS_PORT}`;

export const ASSET_PATH = `${EXPRESS_PATH}/static`;

export const AVATAR_PATH = `${ASSET_PATH}/characters/processed/`;
