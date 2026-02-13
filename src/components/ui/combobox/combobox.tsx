"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import type { ComboboxOption, ComboboxProps } from "./combobox.type";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Selecione",
  disabled = false,
  className,
  inputClassName,
  listClassName,
}: ComboboxProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const selectedLabel = useMemo(() => {
    return options.find((o) => o.value === value)?.label ?? "";
  }, [options, value]);

  useEffect(() => {
    setQuery(selectedLabel);
  }, [selectedLabel]);

  const filteredOptions = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return options;
    return options.filter((o) => {
      const hay = normalizeText(`${o.label} ${o.value}`);
      return hay.includes(q);
    });
  }, [options, query]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      const target = e.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    if (!open) return;

    const update = () => {
      const el = inputRef.current;
      if (!el) return;
      setAnchorRect(el.getBoundingClientRect());
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
    requestAnimationFrame(() => {
      inputRef.current?.blur();
    });
  };

  const shouldRenderPortal = open && !disabled && typeof document !== "undefined";
  const placeAbove =
    !!anchorRect && anchorRect.bottom + 320 > window.innerHeight;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div className="relative">
        <Input
          ref={inputRef}
          value={query}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-disabled={disabled}
          className={cn("pr-10", inputClassName)}
          onFocus={() => {
            if (disabled) return;
            setOpen(true);
          }}
          onClick={() => {
            if (disabled) return;
            setOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!disabled) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
              e.preventDefault();
              setOpen(true);
            }
            if (e.key === "Escape") {
              setOpen(false);
              (e.target as HTMLInputElement).blur();
            }
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {shouldRenderPortal && anchorRect
        ? createPortal(
            <div
              ref={listRef}
              role="listbox"
              className={cn(
                "fixed z-[1000] rounded-lg border border-gray-200 bg-white shadow-lg",
                "max-h-60 overflow-y-auto",
                listClassName
              )}
              style={{
                left: anchorRect.left,
                top: placeAbove ? anchorRect.top - 8 : anchorRect.bottom + 8,
                width: anchorRect.width,
                transform: placeAbove ? "translateY(-100%)" : undefined,
              }}
            >
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Nenhum resultado
                </div>
              ) : (
                filteredOptions.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    role="option"
                    aria-selected={o.value === value}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm hover:bg-gray-50",
                      o.value === value && "bg-gray-50"
                    )}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(o.value)}
                  >
                    {o.label}
                  </button>
                ))
              )}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

