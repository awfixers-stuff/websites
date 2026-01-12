{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/afdcf78bf9115bddc3cb3793e3cfb78ed399fce9.tar.gz") { } }:

let
  inputs = with pkgs;
    [
      bun_1_3
    ];
in
pkgs.mkShell
{
  buildInputs = inputs;
}
