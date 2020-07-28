import { BootController } from 'app/core/boot-control';

declare global {
  interface Window {
    bootController: BootController;
  }
}
