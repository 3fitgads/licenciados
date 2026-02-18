"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import countries from "world-countries";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Create a map of country code to country name in Portuguese (BR)
const countryNameMap = (() => {
  const map = {};
  countries.forEach((country) => {
    if (country.cca2) {
      // Use Portuguese translation if available, otherwise fallback to common name
      const portugueseName = country.translations?.por?.common || country.name.common;
      map[country.cca2] = portugueseName;
    }
  });
  // Add special cases for codes that might not be in world-countries (in Portuguese)
  const specialCases = {
    AC: "Ilha de Ascensão",
    TA: "Tristão da Cunha",
    XK: "Kosovo",
  };
  Object.assign(map, specialCases);
  return map;
})();

// Helper function to get country name
const getCountryName = (countryCode) => {
  const name = countryNameMap[countryCode];
  if (name) return name;
  // Fallback: try to format the code as a readable name
  return countryCode;
};

const PhoneInput = React.forwardRef(
  ({ className, onChange, onCountryCodeChange, value, defaultCountry = "BR", ...props }, ref) => {
    const [selectedCountry, setSelectedCountry] = React.useState(defaultCountry);
    const [phoneValue, setPhoneValue] = React.useState("");
    const inputRef = React.useRef(null);

    // Format Brazilian phone number
    const formatBrazilianPhone = (digits) => {
      const d = digits.replace(/\D/g, '').slice(0, 11);

      if (!d) return '';
      // Don't format until we have at least 2 digits (DDD)
      if (d.length < 2) return d;
      
      const ddd = d.slice(0, 2);
      const part1 = d.length > 10 ? d.slice(2, 7) : d.slice(2, 6);
      const part2 = d.length > 10 ? d.slice(7, 11) : d.slice(6, 10);

      if (d.length === 2) return `(${ddd}`;
      if (d.length <= 6) return `(${ddd}) ${d.slice(2)}`;
      if (d.length <= 10) return `(${ddd}) ${part1}${part2 ? `-${part2}` : ''}`;
      return `(${ddd}) ${part1}-${part2}`;
    };

    // Track if change is internal (from user interaction) vs external (from parent)
    const isInternalChangeRef = React.useRef(false);
    const phoneValueRef = React.useRef(phoneValue);
    
    // Update ref when phoneValue changes
    React.useEffect(() => {
      phoneValueRef.current = phoneValue;
    }, [phoneValue]);
    
    // Parse initial value to get country and phone number
    // Only run when value prop changes from parent, not when we change it internally
    const prevValueRef = React.useRef(value);
    React.useEffect(() => {
      // Skip if this change was triggered internally
      if (isInternalChangeRef.current) {
        isInternalChangeRef.current = false;
        return;
      }
      
      // Only update if value prop actually changed from parent
      if (value !== prevValueRef.current) {
        prevValueRef.current = value;
        if (value) {
          try {
            const parsed = RPNInput.parsePhoneNumber(value);
            if (parsed && parsed.nationalNumber) {
              if (parsed.country) {
                setSelectedCountry(parsed.country);
                // Notify about country code (without +)
                const countryCode = `${parsed.countryCallingCode}`;
                onCountryCodeChange?.(countryCode);
              }
              const nationalNumber = parsed.nationalNumber;
              // Format if Brazil
              if (parsed.country === "BR") {
                setPhoneValue(formatBrazilianPhone(nationalNumber));
              } else {
                setPhoneValue(nationalNumber);
              }
            } else {
              // If parsed but no nationalNumber, try to extract manually
              // Don't reset phoneValue if user is typing
              if (phoneValueRef.current) {
                // Keep current phoneValue if user is actively typing
                return;
              }
              // Only update if phoneValue is empty
              const allDigits = value.replace(/\D/g, '');
              const countryCodeDigits = RPNInput.getCountryCallingCode(defaultCountry);
              let phoneDigits = allDigits;
              if (allDigits.length > countryCodeDigits.length && allDigits.startsWith(countryCodeDigits)) {
                phoneDigits = allDigits.slice(countryCodeDigits.length);
              }
              if (defaultCountry === "BR") {
                setPhoneValue(formatBrazilianPhone(phoneDigits));
              } else {
                setPhoneValue(phoneDigits);
              }
            }
          } catch (e) {
            // If parsing fails completely, don't reset if user is typing
            if (phoneValueRef.current) {
              // Keep current phoneValue if user is actively typing
              return;
            }
            // Only update if phoneValue is empty
            const allDigits = value.replace(/\D/g, '');
            const countryCodeDigits = RPNInput.getCountryCallingCode(defaultCountry);
            let phoneDigits = allDigits;
            if (allDigits.length > countryCodeDigits.length && allDigits.startsWith(countryCodeDigits)) {
              phoneDigits = allDigits.slice(countryCodeDigits.length);
            }
            if (defaultCountry === "BR") {
              setPhoneValue(formatBrazilianPhone(phoneDigits));
            } else {
              setPhoneValue(phoneDigits);
            }
          }
        } else {
          // Only clear if value is explicitly empty/undefined and phoneValue is also empty
          if (!phoneValueRef.current) {
            setPhoneValue("");
          }
        }
      }
    }, [value, defaultCountry, onCountryCodeChange]);

    const handleCountryChange = (country) => {
      // Update country - this will trigger re-render and update flag and country code
      setSelectedCountry(country);
      // Get the new country code (without +)
      const countryCode = RPNInput.getCountryCallingCode(country);
      const countryCodeString = `${countryCode}`;
      
      // Notify parent about country code change
      onCountryCodeChange?.(countryCodeString);
      
      // Don't reformat or change the phone number display, just update the country
      // The phone number should remain exactly as the user typed it
      // Only update the E164 value sent to parent
      if (phoneValue) {
        const digits = phoneValue.replace(/\D/g, '');
        // Reconstruct E164 value with new country
        const e164Value = `+${countryCode}${digits}`;
        // Mark as internal change to prevent useEffect from interfering
        isInternalChangeRef.current = true;
        prevValueRef.current = e164Value;
        onChange?.(e164Value);
      }
    };

    const handlePhoneChange = (e) => {
      const inputValue = e.target.value;
      
      // Format based on country
      let formatted = inputValue;
      if (selectedCountry === "BR") {
        formatted = formatBrazilianPhone(inputValue);
      } else {
        // For other countries, just keep digits
        formatted = inputValue.replace(/\D/g, '');
      }
      
      setPhoneValue(formatted);
      
      // Construct E164 value
      const digits = inputValue.replace(/\D/g, '');
      if (digits && selectedCountry) {
        const countryCode = RPNInput.getCountryCallingCode(selectedCountry);
        const countryCodeString = `${countryCode}`;
        const e164Value = `+${countryCode}${digits}`;
        // Mark as internal change to prevent useEffect from interfering
        isInternalChangeRef.current = true;
        prevValueRef.current = e164Value;
        onChange?.(e164Value);
        // Also notify about country code (in case it wasn't set before, without +)
        onCountryCodeChange?.(countryCodeString);
      } else {
        isInternalChangeRef.current = true;
        prevValueRef.current = "";
        onChange?.("");
      }
    };

    const countryCode = `+${RPNInput.getCountryCallingCode(selectedCountry)}`;

    return (
      <div className={cn("flex items-stretch", className)} ref={ref}>
        <CountrySelect
          disabled={props.disabled}
          value={selectedCountry}
          options={RPNInput.getCountries().map((country) => ({
            value: country,
            label: getCountryName(country),
          }))}
          onChange={handleCountryChange}
        />
        <input
          type="text"
          readOnly
          value={countryCode}
          className={cn(
            "px-2 py-2.5 text-base text-gray-800 border-y border-r-0 border-l border-gray-300 bg-white flex items-center",
            "pointer-events-none w-[55px] text-center"
          )}
          style={{ fontSize: "16px" }}
          tabIndex={-1}
        />
        <Input
          ref={inputRef}
          type="tel"
          value={phoneValue}
          onChange={handlePhoneChange}
          className={cn("rounded-e-lg rounded-s-none flex-1 border-l-0 !px-0 autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white]")}
          placeholder={props.placeholder}
          disabled={props.disabled}
          autoComplete="tel"
          {...props}
        />
      </div>
    );
  },
);
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef(({ className, ...props }, ref) => (
  <Input
    className={cn("rounded-e-lg rounded-s-none flex-1", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredCountries = React.useMemo(() => {
    if (!searchValue.trim()) return countryList;
    const searchLower = searchValue.toLowerCase();
    return countryList.filter(({ label, value }) => {
      if (!value) return false;
      const countryName = label.toLowerCase();
      const code = `+${RPNInput.getCountryCallingCode(value)}`;
      return countryName.includes(searchLower) || code.includes(searchValue);
    });
  }, [countryList, searchValue]);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) {
          setSearchValue("");
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10"
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 z-[100]">
        <div className="flex flex-col">
          {/* Search Input */}
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar país..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500"
            />
          </div>
          
          {/* Country List */}
          <div className="max-h-72 overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-500">
                Nenhum país encontrado.
              </div>
            ) : (
              <div className="p-1">
                {filteredCountries.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null,
                )}
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}) => {
  const handleClick = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(country);
    onSelectComplete();
  }, [country, onChange, onSelectComplete]);

  const isSelected = country === selectedCountry;

  return (
    <div
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-gray-900 outline-none",
        "hover:bg-gray-100 active:bg-gray-200",
        isSelected && "bg-gray-50"
      )}
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm font-medium">{countryName}</span>
      <span className="text-sm text-gray-600">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={cn(
          "ml-auto size-4 text-primary",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

const FlagComponent = ({ country, countryName }) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-gray-200 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
