async function generateUniqueNumber(prefix, model, field = 'uniqueNumber', digits = 4) {
  // Find the latest entry with the prefix, sort descending
  const latest = await model
    .find({ [field]: new RegExp(`^${prefix}`) })
    .sort({ [field]: -1 })
    .limit(1);

  let nextNumber = 1;
  if (latest.length > 0) {
    // Extract numeric part (e.g., 'IN0003' => 3)
    const lastNum = parseInt(latest[0][field].replace(prefix, ''), 10);
    nextNumber = lastNum + 1;
  }

  return `${prefix}${String(nextNumber).padStart(digits, '0')}`;
}

export default generateUniqueNumber