"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateOrganization, inviteTeamMember, removeMember } from "@/app/actions/organizations"
import { Loader2, UserMinus, Crown } from "lucide-react"
import { toast } from "sonner"

interface OrgData {
  id: string
  name: string
  logoUrl: string | null
  brandColor: string
  contactEmail: string | null
  contactPhone: string | null
  subscription: {
    plan: string
    status: string
    trialEndsAt: string | null
  } | null
  memberships: {
    id: string
    userId: string
    role: string
    user: { name: string | null; email: string }
  }[]
}

export default function SettingsPage() {
  const [org, setOrg] = useState<OrgData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("MEMBER")
  const [inviting, setInviting] = useState(false)
  const [orgForm, setOrgForm] = useState({
    name: "",
    logoUrl: "",
    brandColor: "#f59e0b",
    contactEmail: "",
    contactPhone: "",
  })

  const fetchOrg = async () => {
    const res = await fetch("/api/org/context")
    if (res.ok) {
      const data = await res.json()
      if (data.org) {
        setOrg({ ...data.org, memberships: data.members })
        setOrgForm({
          name: data.org.name || "",
          logoUrl: data.org.logoUrl || "",
          brandColor: data.org.brandColor || "#f59e0b",
          contactEmail: data.org.contactEmail || "",
          contactPhone: data.org.contactPhone || "",
        })
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    void Promise.resolve().then(fetchOrg)
  }, [])

  const handleSaveOrg = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!org) return
    setSaving(true)
    try {
      await updateOrganization(org.id, orgForm)
      toast.success("Settings saved")
      await fetchOrg()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save")
    } finally {
      setSaving(false)
    }
  }

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!org || !inviteEmail) return
    setInviting(true)
    try {
      await inviteTeamMember(org.id, inviteEmail, inviteRole)
      toast.success("Member invited")
      setInviteEmail("")
      await fetchOrg()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to invite")
    } finally {
      setInviting(false)
    }
  }

  const handleRemoveMember = async (userId: string) => {
    if (!org) return
    if (!confirm("Remove this team member?")) return
    try {
      await removeMember(org.id, userId)
      toast.success("Member removed")
      await fetchOrg()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to remove")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-amber-500" />
      </div>
    )
  }

  if (!org) {
    return <div className="text-gray-500">Organization not found</div>
  }

  const planLabels: Record<string, string> = {
    STARTER: "Starter — $149/mo",
    PRO: "Pro — $299/mo",
    TEAM: "Team — $499/mo",
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      <Tabs defaultValue="organization">
        <TabsList>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveOrg} className="space-y-4">
                <div>
                  <Label htmlFor="name">Company name *</Label>
                  <Input
                    id="name"
                    value={orgForm.name}
                    onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={orgForm.logoUrl}
                    onChange={(e) => setOrgForm({ ...orgForm, logoUrl: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div>
                  <Label htmlFor="brandColor">Brand color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="brandColor"
                      type="color"
                      value={orgForm.brandColor}
                      onChange={(e) => setOrgForm({ ...orgForm, brandColor: e.target.value })}
                      className="h-10 w-20 rounded cursor-pointer border"
                    />
                    <span className="text-sm text-gray-500">Used on customer portal</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={orgForm.contactEmail}
                      onChange={(e) => setOrgForm({ ...orgForm, contactEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Contact phone</Label>
                    <Input
                      id="contactPhone"
                      value={orgForm.contactPhone}
                      onChange={(e) => setOrgForm({ ...orgForm, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {org.memberships?.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-medium text-sm">
                        {(member.user.name || member.user.email)[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.user.name || member.user.email}</p>
                        <p className="text-xs text-gray-500">{member.user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {member.role === "OWNER" ? (
                        <Badge className="bg-amber-100 text-amber-700">
                          <Crown className="h-3 w-3 mr-1" />
                          Owner
                        </Badge>
                      ) : (
                        <Badge variant="outline">{member.role}</Badge>
                      )}
                      {member.role !== "OWNER" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member.userId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleInvite} className="flex gap-2">
                <Input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@solarco.com"
                  className="flex-1"
                />
                <Select value={inviteRole} onValueChange={(v) => { if (v) setInviteRole(v) }}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MEMBER">Member</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white" disabled={inviting}>
                  {inviting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Invite"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {planLabels[org.subscription?.plan || "STARTER"] || "Starter"}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Status: <span className="font-medium">{org.subscription?.status || "TRIALING"}</span>
                  </p>
                  {org.subscription?.trialEndsAt && (
                    <p className="text-sm text-gray-500">
                      Trial ends: {new Date(org.subscription.trialEndsAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Badge
                  className={
                    org.subscription?.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : org.subscription?.status === "TRIALING"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {org.subscription?.status || "TRIALING"}
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Upgrade your plan:</p>
                <div className="grid grid-cols-3 gap-3">
                  {["PRO", "TEAM"].map((plan) => (
                    <Button
                      key={plan}
                      variant="outline"
                      onClick={async () => {
                        const res = await fetch("/api/stripe/checkout", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ plan, orgId: org.id }),
                        })
                        if (res.ok) {
                          const { url } = await res.json()
                          if (url) window.location.href = url
                        } else {
                          toast.error("Stripe not configured")
                        }
                      }}
                    >
                      {plan}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
