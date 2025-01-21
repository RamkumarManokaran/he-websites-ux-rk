const parseGradeString = (gradeString: string | null) => {
  if (gradeString) {
    return gradeString.split(",")?.map((item) => {
      const [key, value] = item.split("~");
      return { key, value: parseInt(value, 10) };
    });
  }
};

export { parseGradeString };

// const updateUserEntryPointForIncrement = (
//   currentEntry: string,
//   btnName: string
// ): string => {
//   const key = `${btnName}`;
//   const entries = currentEntry?.split("-")?.filter(Boolean);
//   const counts: Record<string, number> = {};
//   entries.forEach((entry) => {
//     const match = entry.match(/^(\d+)?(.*)$/);
//     const count = parseInt(match?.[1] || "1", 10);
//     const value = match?.[2] || "";
//     counts[value] = (counts[value] || 0) + count;
//   });
//   counts[key] = (counts[key] || 0) + 1;
//   return Object.entries(counts)
//     ?.map(([entry, count]) => `${count > 1 ? count : "1"}${entry}`)
//     .join("-");
// };

const updateUserEntryPointForIncrement = (
  currentEntry: string,
  btnName: string,
  validKeys: string[]
): string => {
  const counts: Record<string, number> = {};
  validKeys.forEach((key) => {
    counts[key] = 0;
  });
  const entries = currentEntry?.split("-")?.filter(Boolean);
  entries.forEach((entry) => {
    const match = entry.match(/^(\d+)?(.*)$/);
    const count = parseInt(match?.[1] || "0", 10);
    const value = match?.[2] || "";
    if (value in counts) {
      counts[value] = count;
    }
  });
  if (btnName in counts) {
    counts[btnName] += 1;
  }
  return validKeys?.map((key) => `${counts[key]}${key}`).join("-");
};
export { updateUserEntryPointForIncrement };

// const updateUserEntryPointForDecrement = (
//   currentEntry: string,
//   btnName: string
// ): string => {
//   const key = `${btnName}`;
//   const entries = currentEntry?.split("-")?.filter(Boolean);
//   const counts: Record<string, number> = {};
//   entries.forEach((entry) => {
//     const match = entry.match(/^(\d+)?(.*)$/);
//     const count = parseInt(match?.[1] || "1", 10);
//     const value = match?.[2] || "";
//     counts[value] = (counts[value] || 0) + count;
//   });
//   if (counts[key]) {
//     counts[key] -= 1;
//     if (counts[key] === 0) {
//       delete counts[key];
//     }
//   }
//   return Object.entries(counts)
//     ?.map(([entry, count]) => `${count > 1 ? count : "1"}${entry}`)
//     .join("-");
// };
const updateUserEntryPointForDecrement = (
  currentEntry: string,
  btnName: string,
  validKeys: string[]
): string => {
  const counts: Record<string, number> = {};
  validKeys.forEach((key) => {
    counts[key] = 0;
  });
  const entries = currentEntry?.split("-")?.filter(Boolean);
  entries.forEach((entry) => {
    const match = entry.match(/^(\d+)?(.*)$/);
    const count = parseInt(match?.[1] || "0", 10);
    const value = match?.[2] || "";
    if (value in counts) {
      counts[value] = count;
    }
  });

  if (btnName in counts && counts[btnName] > 0) {
    counts[btnName] -= 1;
  }
  return validKeys?.map((key) => `${counts[key]}${key}`).join("-");
};

export { updateUserEntryPointForDecrement };

const calculateTotalCount = (userEntryPoint: string): number => {
  if (!userEntryPoint) return 0;
  return userEntryPoint
    .split("-")
    .filter(Boolean)
    .reduce((total, entry) => {
      const match = entry.match(/^(\d+)?/);
      const count = match && match[0] ? parseInt(match[0], 10) : 1;
      return total + count;
    }, 0);
};

export { calculateTotalCount };

const getPodspecficGradePoints = (
  gradesString: string,
  userEntryPoint: string
): number => {
  const grades = parseGradeString(gradesString);
  if (!userEntryPoint || !grades?.length) return 0;

  const gradeMap = grades.reduce(
    (map, grade) => {
      map[grade.key.toUpperCase()] = grade.value;
      return map;
    },
    {} as Record<string, number>
  );

  return userEntryPoint
    .split("-")
    .filter(Boolean)
    .reduce((total, entry) => {
      const match = entry.match(/^(\d+)?(.+)/);
      const count = match && match[1] ? parseInt(match[1], 10) : 1;
      const key = match && match[2] ? match[2].toUpperCase() : "";
      return total + count * (gradeMap[key] || 0);
    }, 0);
};

export { getPodspecficGradePoints };

const getSelectedGrade = (userEntryPoint: string, gradeKey: string): number => {
  if (!userEntryPoint || !gradeKey) return 0;

  const normalizedGradeKey = gradeKey.trim().toUpperCase();
  return userEntryPoint
    .split("-")
    .filter(Boolean)
    .reduce((count, entry) => {
      const match = entry.match(/^(\d+)?(.+)/);
      const currentCount = match && match[1] ? parseInt(match[1], 10) : 1;
      const currentKey = match && match[2] ? match[2].toUpperCase() : "";
      return currentKey === normalizedGradeKey ? count + currentCount : count;
    }, 0);
};

export { getSelectedGrade };

export const formatQualificationLabel = (input: string): string => {
  if (!input) return "";
  return input
    .toLowerCase()
    .split("-")
    ?.map((word) => word.charAt(0).toUpperCase() + word?.slice(1))
    .join(" ");
};

export function uppercaseToLowercase(input: string) {
  return input.toLowerCase().replace(/\s+/g, "-");
}

export const formatToUpperCase = (input: string): string => {
  return input.replace(/[a-z]/g, (match) => match.toUpperCase());
};

export function extractValue(input: any, key: any) {
  const parts = input.split("-");

  for (const part of parts) {
    if (part.endsWith(key)) {
      return parseInt(part?.slice(0, -1)) || 0;
    }
  }

  return 0;
}

export function extractMinMax(input: any, key: any) {
  if (input.includes("-")) {
    const [min, max] = input.split("-")?.map(Number);
    if (key === "min") return Number(min);
    if (key === "max") return Number(max);
  } else {
    return "";
  }
}

export function isNumeric(value: any) {
  return (
    !isNaN(value) &&
    value !== null &&
    value !== "" &&
    typeof value !== "boolean"
  );
}
