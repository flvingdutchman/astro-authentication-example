/// <reference types="astro/client" />
declare namespace App {
    interface Locals {
        message: string;
        user?: User;
        session?: Session;
    }
}