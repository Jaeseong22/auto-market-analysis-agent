import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Minus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface ProjectFormData {
  projectName: string;
  projectPurpose: string;
  projectOverview: string;
  coreFeatures: string;
  targetCustomer: string[];
  problemDefinition: string;
  technicalApproach: string;
  projectPeriod: {
    start: string;
    end: string;
  };
  teamSize: number;
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
    targetCustomer: [],
    problemDefinition: "",
    technicalApproach: "",
    projectPeriod: {
      start: "",
      end: "",
    },
    teamSize: 1,
    budget: "",
    expectedOutcome: "",
    additionalRequirements: "",
  });

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const ageGroups = [
    { emoji: "🧒", label: "10s", value: "10s" },
    { emoji: "🧑", label: "20s", value: "20s" },
    { emoji: "👨", label: "30s", value: "30s" },
    { emoji: "👩", label: "40s", value: "40s" },
    { emoji: "👴", label: "50+", value: "50+" },
  ];

  const handleChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAgeGroup = (value: string) => {
    setFormData(prev => ({
      ...prev,
      targetCustomer: prev.targetCustomer.includes(value)
        ? prev.targetCustomer.filter(v => v !== value)
        : [...prev.targetCustomer, value]
    }));
  };

  const updateTeamSize = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      teamSize: Math.max(1, Math.min(50, prev.teamSize + delta))
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      projectPeriod: {
        start: startDate ? format(startDate, "yyyy-MM-dd") : "",
        end: endDate ? format(endDate, "yyyy-MM-dd") : "",
      },
    };
    onSubmit(submissionData);
  };

  const isFormValid = () => {
    return (
      formData.projectName.trim() !== "" &&
      formData.projectPurpose.trim() !== "" &&
      formData.projectOverview.trim() !== "" &&
      formData.coreFeatures.trim() !== "" &&
      formData.targetCustomer.length > 0 &&
      formData.problemDefinition.trim() !== "" &&
      formData.technicalApproach.trim() !== "" &&
      startDate !== undefined &&
      endDate !== undefined &&
      formData.teamSize > 0 &&
      formData.budget.trim() !== "" &&
      formData.expectedOutcome.trim() !== ""
    );
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
              <Label>타겟 고객 (연령대) *</Label>
              <div className="flex flex-wrap gap-2">
                {ageGroups.map((group) => (
                  <button
                    key={group.value}
                    type="button"
                    onClick={() => toggleAgeGroup(group.value)}
                    disabled={isLoading}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all",
                      "hover:scale-105 active:scale-95",
                      formData.targetCustomer.includes(group.value)
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-border bg-background hover:border-primary/50"
                    )}
                  >
                    <span className="text-2xl">{group.emoji}</span>
                    <span className="font-medium">{group.label}</span>
                  </button>
                ))}
              </div>
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
                <Label>프로젝트 시작일 *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "시작일 선택"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>프로젝트 종료일 *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "종료일 선택"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => startDate ? date < startDate : false}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>프로젝트 인원 *</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateTeamSize(-1)}
                  disabled={isLoading || formData.teamSize <= 1}
                  className="h-12 w-12"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-4xl font-bold text-primary">{formData.teamSize}</div>
                  <div className="text-sm text-muted-foreground">명</div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateTeamSize(1)}
                  disabled={isLoading || formData.teamSize >= 50}
                  className="h-12 w-12"
                >
                  <Plus className="h-4 w-4" />
                </Button>
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
