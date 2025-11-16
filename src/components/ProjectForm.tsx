import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface ProjectFormData {
  projectName: string;
  projectPurpose: string;
  projectOverview: string;
  coreFeatures: string;
  targetCustomer: string;
  problemDefinition: string;
  technicalApproach: string;
  projectPeriod: string;
  teamSize: string;
  budget: string;
  expectedOutcome: string;
  additionalRequirements?: string;
}

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  isLoading: boolean;
}

export const ProjectForm = ({ onSubmit, isLoading }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    projectPurpose: "",
    projectOverview: "",
    coreFeatures: "",
    targetCustomer: "",
    problemDefinition: "",
    technicalApproach: "",
    projectPeriod: "",
    teamSize: "",
    budget: "",
    expectedOutcome: "",
    additionalRequirements: "",
  });

  const handleChange = (field: keyof ProjectFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = () => {
    const requiredFields: (keyof ProjectFormData)[] = [
      "projectName",
      "projectPurpose",
      "projectOverview",
      "coreFeatures",
      "targetCustomer",
      "problemDefinition",
      "technicalApproach",
      "projectPeriod",
      "teamSize",
      "budget",
      "expectedOutcome",
    ];
    return requiredFields.every(field => formData[field].trim() !== "");
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-background">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">프로젝트 정보 입력</CardTitle>
          <CardDescription>
            프로젝트 분석을 위해 아래 정보를 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">프로젝트명 *</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleChange("projectName", e.target.value)}
                placeholder="프로젝트 이름을 입력하세요"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectPurpose">프로젝트 목적 *</Label>
              <Textarea
                id="projectPurpose"
                value={formData.projectPurpose}
                onChange={(e) => handleChange("projectPurpose", e.target.value)}
                placeholder="이 프로젝트를 왜 하는가"
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectOverview">프로젝트 개요 *</Label>
              <Textarea
                id="projectOverview"
                value={formData.projectOverview}
                onChange={(e) => handleChange("projectOverview", e.target.value)}
                placeholder="무엇을 만들며 어떤 문제를 해결하는지"
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coreFeatures">핵심 기능 *</Label>
              <Textarea
                id="coreFeatures"
                value={formData.coreFeatures}
                onChange={(e) => handleChange("coreFeatures", e.target.value)}
                placeholder="주요 기능 리스트"
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetCustomer">타겟 고객 *</Label>
              <Textarea
                id="targetCustomer"
                value={formData.targetCustomer}
                onChange={(e) => handleChange("targetCustomer", e.target.value)}
                placeholder="누구를 위한 서비스인지"
                disabled={isLoading}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problemDefinition">문제 정의 *</Label>
              <Textarea
                id="problemDefinition"
                value={formData.problemDefinition}
                onChange={(e) => handleChange("problemDefinition", e.target.value)}
                placeholder="JTBD 또는 고객 Pain Point"
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="technicalApproach">기술 접근 방식 *</Label>
              <Input
                id="technicalApproach"
                value={formData.technicalApproach}
                onChange={(e) => handleChange("technicalApproach", e.target.value)}
                placeholder="예: 앱/웹/AI/SaaS/플랫폼"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectPeriod">프로젝트 기간 *</Label>
                <Input
                  id="projectPeriod"
                  value={formData.projectPeriod}
                  onChange={(e) => handleChange("projectPeriod", e.target.value)}
                  placeholder="예: 2025.01 ~ 2025.06"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSize">프로젝트 인원 *</Label>
                <Input
                  id="teamSize"
                  value={formData.teamSize}
                  onChange={(e) => handleChange("teamSize", e.target.value)}
                  placeholder="예: 기획 1, 개발 2, 디자인 1"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">예산 *</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
                placeholder="예: 5천만 원"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedOutcome">기대효과 *</Label>
              <Textarea
                id="expectedOutcome"
                value={formData.expectedOutcome}
                onChange={(e) => handleChange("expectedOutcome", e.target.value)}
                placeholder="예상되는 기대효과나 성과"
                disabled={isLoading}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalRequirements">추가 요구사항 (선택)</Label>
              <Textarea
                id="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={(e) => handleChange("additionalRequirements", e.target.value)}
                placeholder="추가로 전달하고 싶은 내용이 있다면 입력하세요"
                disabled={isLoading}
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid() || isLoading}
            >
              {isLoading ? "처리 중..." : "제출하고 분석 시작"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
