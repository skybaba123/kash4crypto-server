import Company from "@/models/company";
import ImageTrash from "@/models/imageTrash";

const updateCompanyHandler = async (req: any, res: any) => {
  try {
    const companies = await Company.find({});
    if (companies.length <= 0)
      return res.status(404).send({ error: "No company data found" });
    const company = companies[0];

    if (req.user.role !== "admin")
      return res.status(400).send({ error: "Unauthorized Access" });

    if (req.body.icon && company.icon.secure_url) {
      //store icon in image trash
      const newImageTrash = new ImageTrash({
        label: "Updated icon from company",
        location: "company",
        locationId: company._id,
        image: company.icon,
      });
      await newImageTrash.save();
    }

    if (req.body.logo && company.logo.secure_url) {
      //store logo in image trash
      const newImageTrash = new ImageTrash({
        label: "Updated logo from company",
        location: "company",
        locationId: company._id,
        image: company.logo,
      });
      await newImageTrash.save();
    }

    for (const key in req.body) {
      (company as any)[key] = req.body[key];
    }

    const savedComapany = await company.save();

    return res.status(200).send(savedComapany);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export default updateCompanyHandler;
