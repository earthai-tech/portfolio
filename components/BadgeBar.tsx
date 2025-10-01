import Image from "next/image";

export function BadgeBar() {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <a href="https://github.com/earthai-tech/k-diagram/actions/workflows/python-package-conda.yml" target="_blank" className="badge">
        Build
      </a>
      <a href="https://k-diagram.readthedocs.io/en/latest/" target="_blank" className="badge">
        Docs
      </a>
      <a href="https://pypi.org/project/k-diagram/" target="_blank" className="badge">
        PyPI
      </a>
    </div>
  );
}
